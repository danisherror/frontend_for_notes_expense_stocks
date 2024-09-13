// import React, { useState, useEffect } from "react";
// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

// const All_Stocks_Names: React.FC = () => {
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [stocks, setStocks] = useState<string[]>([]);

//     const getdata = async () => {
//         try {
//             const res = await fetch(`http://127.0.0.1:8000/api/al_stocks_names`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             });

//             if (res.status === 200) {
//                 const data = await res.json();
//                 setStocks(data.symbols);
//             } else {
//                 setError("404 Error: Resource not found");
//             }
//         } catch (err) {
//             setError("An error occurred while fetching data");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         getdata();
//     }, []);  // Add empty dependency array to ensure the effect runs once

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <>
//             <Breadcrumb pageName="Room Complaints" />
//             <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//                 <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
//                     <table className="w-full table-auto">
//                         <thead>
//                             <tr className="bg-gray-2 text-left dark:bg-meta-4">
//                                 <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
//                                     Name
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {stocks.map((stock, key) => (
//                                 <tr key={key}>
//                                     <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
//                                         <h5 className="font-medium text-black dark:text-white">
//                                             {stock}
//                                         </h5>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default All_Stocks_Names;

import React, { useState, useEffect } from "react";
import {  NavLink } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const All_Stocks_Names: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [stocks, setStocks] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');  // State for the search term
    const [filteredStocks, setFilteredStocks] = useState<string[]>([]);  // State for filtered stocks

    const getdata = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/al_stocks_names`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (res.status === 200) {
                const data = await res.json();
                setStocks(data.symbols);
                setFilteredStocks(data.symbols);  // Initialize filtered stocks with all stocks
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
    }, []);

    // Handle search input changes
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Filter stocks based on search term
    const handleSearch = () => {
        const filtered = stocks.filter(stock => stock.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredStocks(filtered);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <Breadcrumb pageName="All Stocks" />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

                {/* Search Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search for a stock"
                        className="border border-gray-300 rounded-md p-2 mr-2"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white rounded-md px-4 py-2"
                    >
                        Search
                    </button>
                </div>

                {/* Scrollable Table */}
                <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Name
                                </th>
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    All Historical Data
                                </th>
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Last Month
                                </th>
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Last week
                                </th>
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Last Day
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStocks.length > 0 ? (
                                filteredStocks.map((stock, key) => (
                                    <tr key={key}>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {stock}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <NavLink to={`/stocks/historical_data/all_historical_data/${stock}`}>
                                            <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            >
                                                see</button></NavLink>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <NavLink to={`/stocks/historical_data/last_month_historical_data/${stock}`}>
                                            <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            >
                                                see</button></NavLink>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <NavLink to={`/stocks/historical_data/last_week_historical_data/${stock}`}>
                                            <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            >
                                                see</button></NavLink>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <NavLink to={`/stocks/historical_data/last_day_historical_data/${stock}`}>
                                            <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            >
                                                see</button></NavLink>
                                    </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={1} className="text-center py-4">
                                        No stocks found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default All_Stocks_Names;
