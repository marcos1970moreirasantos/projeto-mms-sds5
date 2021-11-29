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
                const _item = response.data as SaleSuccess[];
                const myLabels = _item.map(_item => _item.sellerName);
                const mySeries = _item.map(_item => round(100.0 * _item.deals / _item.visited, 1));

                setchartData({

                    labels: {
                        categories: myLabels
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