import { useMemo } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

/*
Contoh data:
const contohData = [
    { label: 'Penjualan', value: 500 },
    { label: 'Retur', value: 20 },
    { label: 'Pending', value: 45 }
]
<ChartDoughnut name="Transaksi" stats={contohData} />
*/

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)]
    return color
}

export default function ChartDoughnut({ stats = [], name }) {
    const totalValue = useMemo(() => stats.reduce((acc, curr) => acc + curr.value, 0), [stats])

    const chartData = useMemo(() => ({
        labels: stats.map(item => item.label),
        datasets: [
            {
                data: stats.map(item => item.value),
                backgroundColor: stats.map(item => item.color ?? getRandomColor()),
                borderWidth: 0,
                hoverOffset: 4
            }
        ]
    }), [stats])

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        borderRadius: 50,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                }
            },
            tooltip: {
                backgroundColor: '#1f2937',
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: (ctx) => ` ${ctx.label}: ${ctx.raw}`
                }
            }
        }
    }

    return (
        <div className="p-6 bg-[var(--bg-color)] rounded-lg shadow-md max-md:w-[88dvw] w-md border-style-default">
            <div className="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 15 15" className="fill-[var(--link-color)]">
                    <path d="M0 7.5A7.5 7.5 0 0 1 7 .016v4.019A3.5 3.5 0 0 0 7.5 11a3.48 3.48 0 0 0 2.096-.697l2.842 2.842A7.47 7.47 0 0 1 7.5 15 7.5 7.5 0 0 1 0 7.5zm13.145 4.938A7.47 7.47 0 0 0 15 7.5c0-1.034-.209-2.018-.587-2.914l-3.658 1.626A3.49 3.49 0 0 1 11 7.5a3.48 3.48 0 0 1-.697 2.096l2.842 2.842zM8 4.035V.016a7.5 7.5 0 0 1 5.963 3.675L10.254 5.34A3.5 3.5 0 0 0 8 4.035z" />
                </svg>
                <h3 className="mb-4 text-[length:var(--x)] font-['Bold',_ui-sans-serif] text-[var(--link-color)]">{name}</h3>
            </div>
            <div className="relative h-64 w-full flex justify-center items-center mt-4">
                {stats.length > 0 ? (
                    <>
                        <Doughnut data={chartData} options={chartOptions} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-gray-800">{totalValue}</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Total</span>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-400">Data Kosong</p>
                )}
            </div>
        </div>
    )
}
