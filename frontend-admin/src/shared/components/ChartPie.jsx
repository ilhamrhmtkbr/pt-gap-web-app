import { useMemo } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

/*
Contoh data:
const contohData = [
    { label: 'Penjualan', value: 500 },
    { label: 'Retur', value: 20 },
    { label: 'Pending', value: 45 }
]
<ChartPie name="Distribusi" stats={contohData} />
*/

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)]
    return color
}

export default function ChartPie({ stats = [], name }) {
    const chartData = useMemo(() => ({
        labels: stats.map(item => item.label),
        datasets: [
            {
                label: 'Total Transaksi',
                data: stats.map(item => item.value),
                backgroundColor: stats.map(item => item.color || getRandomColor()),
                borderColor: '#ffffff',
                borderWidth: 2,
                hoverOffset: 10
            }
        ]
    }), [stats])

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: { family: "'Inter', sans-serif", size: 12 }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: (context) => {
                        let label = context.label || ''
                        if (label) label += ': '
                        if (context.parsed !== null) label += context.parsed + ' Unit'
                        return label
                    }
                }
            }
        }
    }

    return (
        <div className="p-6 bg-[var(--bg-color)] rounded-lg shadow-md max-md:w-[88dvw] w-md border-style-default">
            <div className="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 32 32" className="fill-[var(--link-color)]">
                    <path d="M15 0v17.3l15.947 4.784C31.568 20.543 32 18.688 32 16.571 32 7.419 23.453 0 15 0h0zm-2 3c-6.971.728-13 7.026-13 14.5C0 25.508 6.492 32 14.5 32c5.897 0 10.963-3.526 13.229-8.582L13 19V3h0z" fillRule="evenodd" />
                </svg>
                <h3 className="mb-4 text-[length:var(--x)] font-['Bold',_ui-sans-serif] text-[var(--link-color)]">{name}</h3>
            </div>
            <div className="h-64 w-full flex justify-center mt-4">
                {stats.length > 0
                    ? <Pie data={chartData} options={chartOptions} />
                    : <p className="text-gray-400 self-center">Belum ada data</p>
                }
            </div>
        </div>
    )
}
