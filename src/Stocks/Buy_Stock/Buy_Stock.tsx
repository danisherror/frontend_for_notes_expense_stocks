import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from 'react-router-dom';

const Buy_Stock = () => {
    const { symbol_id } = useParams();
    const [symbol, setSymbol] = useState(symbol_id || "");
    const [name, setName] = useState("");
    const [timestamp, settimestamp] = useState("");
    const [price_per_unit, setPrice_per_unit] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();
    const [all_stocks_name, setStocks] = useState<string[]>([]);
    const handleInputChange = (event) => {
        const inputDateTime = new Date(event.target.value);
        const formattedDateTime = inputDateTime.toISOString();
        settimestamp(formattedDateTime);
      };
    const submit_Buy_stock = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/but_stocks`, {
            method: "POST",
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
                created_at: "2024-08-29T10:02:08.460Z",
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
            const res = await fetch(`http://127.0.0.1:8000/api/al_stocks_names`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (res.status === 200) {
                const data = await res.json();
                setStocks(data.symbols);
            } else {
                setError("404 Error: Resource not found");
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
                            <select
                                value={symbol}
                                onChange={(e) => setSymbol(e.target.value)}
                                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                                style={{ width: "100%", padding: "10px" }}
                            >
                                {all_stocks_name.length > 0 ? (
                                all_stocks_name.map((stock, key) => (
                                     <option key={key} value={stock}>{stock}</option>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={1} className="text-center py-4">
                                        No stocks found
                                    </td>
                                </tr>
                            )}
                                {/* Add more options as needed */}
                            </select>
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
                           Date of Transaction
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