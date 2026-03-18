import { useMemo } from 'react'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

/*
Contoh data:
const contohData = [
    { label: 'Jan', value: 450 },
    { label: 'Feb', value: 590 },
    { label: 'Mar', value: 800 },
]
<ChartBar name="Revenue" stats={contohData} />
*/

export default function ChartBar({ stats = [], name }) {
    const chartData = useMemo(() => ({
        labels: stats.map(item => item.label),
        datasets: [
            {
                label: 'Revenue',
                data: stats.map(item => item.value),
                backgroundColor: '#6366f1',
                hoverBackgroundColor: '#4f46e5',
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 32,
            }
        ]
    }), [stats])

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                padding: 12,
                backgroundColor: '#1f2937',
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: false,
                    color: '#f3f4f6',
                },
                ticks: {
                    color: '#9ca3af',
                    font: { size: 11 }
                }
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: '#6b7280',
                    font: { size: 12, weight: '500' }
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        }
    }

    return (
        <div className="p-6 bg-[var(--bg-color)] rounded-lg shadow-md max-md:w-[88dvw] w-lg border-style-default">
            <div className="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" className="fill-[var(--link-color)]">
                    <path fillRule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7zm6 6a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0V8zm-5 2a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1zm8 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1z" />
                </svg>
                <h3 className="mb-4 text-[length:var(--x)] font-['Bold',_ui-sans-serif] text-[var(--link-color)]">{name}</h3>
            </div>
            <div className="h-80 w-full mt-4">
                {stats.length > 0
                    ? <Bar data={chartData} options={chartOptions} />
                    : <div className="flex h-full items-center justify-center text-gray-400">Memuat data...</div>
                }
            </div>
        </div>
    )
}
