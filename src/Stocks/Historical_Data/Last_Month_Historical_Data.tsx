import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import options from './template';
interface Last_Month_Historical_dataState {
    series: {
        name: string;
        data: string[]
    }[];
}

const Last_Month_Historical_data: React.FC = () => {
    const [state, setState] = useState<Last_Month_Historical_dataState>({
        series: [
            {
                name: 'Historical Data',
                data: []
            }
        ],
    });

    const [chartOptions, setChartOptions] = useState<ApexOptions>(options);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { symbol_id } = useParams();

    const getdata = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/fetch_historical_last_month_data/${symbol_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (res.status === 200) {
                const data = await res.json();
                // Calculate min/max values
                let max_value = Math.max(...data.last_month_data.map(item => item.Close));
                let min_value = Math.min(...data.last_month_data.map(item => item.Close));

                // Get all dates and close values
                const all_data = data.last_month_data.map(item => item.Close);
                const all_date = data.last_month_data.map(item => item.Date);

                // Update chart series
                setState({
                    series: [
                        {
                            name: 'Historical Data',
                            data: all_data
                        }
                    ],
                });

                // Update chart options for xaxis (dates) and yaxis (min/max values)
                setChartOptions((prevOptions) => ({
                    ...prevOptions,
                    xaxis: {
                        ...prevOptions.xaxis,
                        categories: all_date,
                    },
                    yaxis: {
                        ...prevOptions.yaxis,
                        min: min_value,
                        max: max_value,
                    },
                }));
            } else {
                setError("404 Error: Resource not found");
            }
        } catch (err) {
            setError("An error occurred while fetching data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getdata();
    }, [symbol_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            <div>
                <div id="Last_Month_Historical_data" className="-ml-5">
                    <ReactApexChart
                        options={chartOptions}
                        series={state.series}
                        type="area"
                        height={500}
                    />
                </div>
            </div>
        </div>
    );
};

export default Last_Month_Historical_data;
