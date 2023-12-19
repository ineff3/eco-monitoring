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
    // scales: {
    //     y: {
    //         ticks: {
    //             beginAtZero: true,
    //             stepSize: 5
    //         }

    //     },

    // },
};





const CompensationBarchart = ({ dataValues, satisfies }: { dataValues: number[], satisfies: boolean }) => {
    const secondColumnColor = satisfies ? '#c6e6d6' : '#F2C4C4'
    const data = {
        labels: ['permitted amount', 'actual amount'],
        datasets: [
            {
                label: 'COMP',
                data: dataValues,
                backgroundColor: ['#E3E3E3', secondColumnColor],
                barThickness: 80,
                maxBarThickness: 150,
            },
        ],
    };
    return (
        <Bar
            options={options}
            data={data}
        />
    )
}

export default CompensationBarchart