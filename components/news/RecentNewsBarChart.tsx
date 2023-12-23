'use client'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: false,

        },
    },
    scales: {
        y: {
            ticks: {
                beginAtZero: true,
                stepSize: 5
            }

        },

    },
};




const RecentNewsBarChart = ({ labels, values }: { labels: string[], values: number[] }) => {
    // const labels = ['Ivano-Frankivsk', 'Dnipropetrovsk', 'Kirovohrad', 'Kyiv'];
    const data = {
        labels,
        datasets: [
            {
                label: 'City',
                data: values,
                backgroundColor: '#c6e6d6',
                barThickness: 50,
                maxBarThickness: 100,
                borderColor: '#d3d3d3',
                borderWidth: 1
            },
        ],
    };

    return (
        <Bar
            options={options}
            data={data as any}
        />
    )
}

export default RecentNewsBarChart