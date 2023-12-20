'use client'
import { Exo } from 'next/font/google'
const exo = Exo({
    subsets: ['latin'],
    variable: '--font-exo',
    display: 'swap'
})
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
                font: {
                    size: 13,
                    // family: exo.className
                },
                callback: (value: number) => [`${value} UAH`, '']
            },
        },
        x: {
            ticks: {
                font: {
                    size: 10
                }

            }

        },

    },
};





const EmissionBarchart = ({ dataValues }: { dataValues: number[] }) => {
    const data = {
        labels: ['Air tax', 'Water tax', 'Disposal wastes tax', 'Radioactive tax', 'Temp radioactive tax'],
        datasets: [
            {
                label: 'TAX',
                data: dataValues,
                backgroundColor: '#c6e6d6',
                barThickness: 60,
                maxBarThickness: 150,
            },
        ],
    };
    return (
        <Bar
            options={options as any}
            data={data}
        />
    )
}

export default EmissionBarchart