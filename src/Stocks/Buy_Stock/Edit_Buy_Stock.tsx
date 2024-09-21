import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from 'react-router-dom';

const Buy_Stock = () => {
    const { symbol_id } = useParams();
    const [symbol, setSymbol] = useState();
    const [name, setName] = useState("");
    const [timestamp, settimestamp] = useState("");
    const [timestampampm, settimestampampm] = useState("");
    const [price_per_unit, setPrice_per_unit] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [created_at, setCreatedAt] = useState("");
    const navigate = useNavigate();
    const handleInputChange = (event) => {
        const inputDateTime = new Date(event.target.value);
        const formattedDateTime = inputDateTime.toISOString();
        settimestamp(formattedDateTime);
      };
    const convertToAmPm = (dateString) => {
        const date = new Date(dateString);

        // Format the date to 'MM/DD/YYYY, hh:mm:ss AM/PM' format
        const formattedDate = date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true, // This ensures AM/PM format
        });

        return formattedDate;
    };
    const token = localStorage.getItem('token');
    const submit_Buy_stock = async (e) => {
        e.preventDefault();
        console.log(timestamp)
        const response = await fetch(`http://127.0.0.1:8000/api/buy_stocks/${symbol_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                symbol: symbol,
                name: name,
                timestamp: timestamp,
                price_per_unit: price_per_unit,
                quantity: quantity,
                created_at: created_at,
                last_updated: "2024-08-29T10:02:08.460Z"
            }),
        });
        const data = await response.json();

        if (response.status === 200) {
            alert("Stock Buye successfully")
            navigate('/');

        } else {
            alert("Error Buying stock");
            // Optionally, you can handle success actions here
        }
    };
    const getdata = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/buy_stocks/${symbol_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (res.status === 200) {
                const data = await res.json();
                setSymbol(data.symbol)
                setName(data.name)
                setPrice_per_unit(data.price_per_unit)
                setQuantity(data.quantity)
                settimestamp(data.timestamp)
                setCreatedAt(data.created_at)
                settimestampampm(convertToAmPm(data.timestamp))
            } else {
                alert("404 Error: Resource not found");
            }
        } catch (err) {
            alert(err);
        }
    };
    useEffect(() => {
        getdata();
    }, []);


    return (
        <>
            <Breadcrumb pageName="Buy Stocks" />

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">


                {/* <!-- Time and date --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Name of the stock
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Write Name of the stock"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Symbol of stock
                            </label>
                            <input
                                type="text"
                                value={symbol}
                                onChange={(e) => setPrice_per_unit(e.target.value)}
                                placeholder="Write price of the stock"
                                disabled
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Price of the stock
                            </label>
                            <input
                                type="number"
                                value={price_per_unit}
                                onChange={(e) => setPrice_per_unit(e.target.value)}
                                placeholder="Write price of the stock"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Number of Stocks
                            </label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Write number of the stock"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                           Date of Transaction {timestampampm}
                            </label>
                            <input
                                type="datetime-local"
                                id="timestamp"
                                onChange={handleInputChange}
                                placeholder="Time of the buying the stock"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                required
                            />
                        </div>
                        <div className="flex justify-center gap-4.5">
                            <button
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                                onClick={submit_Buy_stock}
                            >
                                Save
                            </button>
                        </div>
                    </div>

                </div>


            </div>
        </>
    );
};

export default Buy_Stock;