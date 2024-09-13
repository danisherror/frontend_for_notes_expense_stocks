import React, { useState, useEffect } from "react";
import { useParams, NavLink } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import options from './template';
interface All_Historical_DataState {
    series: {
        name: string;
        data: string[]
    }[];
}

const All_Historical_Data: React.FC = () => {
    const [state, setState] = useState<All_Historical_DataState>({
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
            const res = await fetch(`http://127.0.0.1:8000/api/fetch_historical_data_of_the_symbol/${symbol_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (res.status === 200) {
                const data = await res.json();

                // Calculate min/max values
                let max_value = Math.max(...data.historical_data.map(item => item.Close)) + 100;
                let min_value = 0;

                // Get all dates and close values
                const all_data = data.historical_data.map(item => item.Close);
                const all_date = data.historical_data.map(item => item.Date);

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
            <Breadcrumb pageName="All Stock Data" />
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex w-full max-w-55 justify-end">
                    <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
                        <NavLink to={`/stocks/historical_data/last_day_historical_data/${symbol_id}`}>
                            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
                                Day
                            </button>
                        </NavLink>
                        <NavLink to={`/stocks/historical_data/last_week_historical_data/${symbol_id}`}>
                            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                                Week
                            </button>
                        </NavLink>
                        <NavLink to={`/stocks/historical_data/last_month_historical_data/${symbol_id}`}>
                            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                                Month
                            </button>
                        </NavLink>
                        <NavLink to={`/stocks/historical_data/all_historical_data/${symbol_id}`}>
                            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                                All
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div>
                <div id="All_Historical_Data" className="-ml-5">
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

export default All_Historical_Data;
