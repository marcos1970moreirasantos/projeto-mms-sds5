import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSum } from 'type/sale';
import { BASE_URL } from 'utils/request';

type ChartData = {
    labels: string[];
    series: number[];

}

const DonutChart = () => {

    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });



    useEffect(() => {
        axios.get(BASE_URL + '/sales/amount-by-seller')
            .then(response => {
                const _item = response.data as SaleSum[];
            
                const mySeries = _item.map(data => data.sum);

                setChartData({ labels: [], series: mySeries });


            });


    }, []);

    const options = {
        legend: {
            show: true
        }
    }


    return (

        <Chart

            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"


        />


    );
}

export default DonutChart;