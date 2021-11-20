import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSuccess } from 'type/sale';
import { round } from 'utils/formats';
import { BASE_URL } from 'utils/request';

type SeriesData = {

    name: string;
    data: number[];
}

type ChartData = {

    labels: {
        categories: string[];
    };
    series: SeriesData[];
}

const BarChart = () => {

    const [chartData, setchartData] = useState<ChartData>({
        labels: {
            categories: []
        },
        series: [
            {
                name: "",
                data: []

            }
        ]

    });


    useEffect(() => {
        axios.get(BASE_URL + '/sales/success-by-seller')
            .then(response => {
                const data = response.data as SaleSuccess[];
                const mySeries = data.map(x => round(100.0 * x.deals / x.visited, 1));

                setchartData({

                    labels: {
                        categories: []
                    },
                    series: [
                        {
                            name: "% Sucesso",
                            data: mySeries

                        }
                    ]

                });


            });


    }, []);

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };

    return (

        <Chart

            options={{ ...options, xaxis: chartData.labels }}
            series={chartData.series}
            type="bar"
            height="240"


        />


    );
}

export default BarChart;