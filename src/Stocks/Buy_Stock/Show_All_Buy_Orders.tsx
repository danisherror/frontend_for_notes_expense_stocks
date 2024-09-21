import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, useParams } from 'react-router-dom'
import Model from 'react-modal'
Model.setAppElement("#root");
const Show_All_Buy_Orders = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [buy_orders, setBuyOrders] = useState([]);
    const { symbol_id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBuyOrder, setSelectedBuyOrder] = useState(null);
    const openModal = (note) => {
        setSelectedBuyOrder(note);
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setSelectedBuyOrder(null);
        setIsModalOpen(false);
    }
    const getToken = () => {
        return localStorage.getItem('token');
    }
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
    const changethebackgrounofthing = (thing) => {
        switch (thing) {
            case "Closed":
                return "#ff9999";
            case "Open":
                return 'bg-primary text-primary';
            case "In Progress":
                return 'bg-secondary text-secondary';
            case "1":
                return 'bg-success text-success';
            case "2":
                return 'bg-danger text-danger';
            case "3":
                return 'bg-warning text-warning';
            case "Low":
                return 'bg-secondary text-secondary';
            default:
                return 'bg-info text-info';
        }
    }
    const token = getToken();

    const getdata = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/buy_stocks/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();
            if (res.status === 200) {
                setBuyOrders(data)
            }
            else {
                setError("404 Error: Resource not found");
            }
        } catch (err) {
            setError("An error occurred while fetching data");
            alert(err);
        } finally {
            setLoading(false);
        }
    }
    const deleteBuyOrder = async (id) => {
        const confirmation = window.confirm("Are you sure you want to delete this Buy order?");
        if (confirmation) {

            const res = await fetch(`http://127.0.0.1:8000/api/buy_stocks/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (res.status === 200) {
                alert("Buy Order deleted successfully")
                navigate('/');
            }
            else {
                console.error("404 Error: Resource not found");
            }
        }
    }

    useEffect(() => {
        getdata();
    }, [])
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <>
            <Breadcrumb pageName={`Buy Orders of ${symbol_id}`} />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

                <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Price Per Unit
                                </th>
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Time of Buy
                                </th>
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    View
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Edit
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {buy_orders.map((buyorder, key) => (
                                <tr key={key}>

                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {buyorder.price_per_unit}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {convertToAmPm(buyorder.timestamp)}
                                        </h5>
                                    </td>

                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">

                                        <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            onClick={() => openModal(buyorder)}
                                        >
                                            View</button>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <NavLink to={`/stocks/edit_buy_stock/${buyorder.id}`}>
                                            <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            >
                                                edit</button></NavLink>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">

                                        <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            onClick={() => deleteBuyOrder(buyorder.id)}
                                        >
                                            Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='max-w-full overflow-x-auto'>
                    {selectedBuyOrder && (
                        <Model
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            contentLabel="Buy Order Details"
                            className="modal"
                            overlayClassName="overlay"
                        >
                            <div className='modelpopupbuttoncontainer'>
                                <NavLink to={`/stocks/edit_buy_stock/${selectedBuyOrder.id}`}>
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                                        onClick={closeModal}
                                        aria-label='edit'
                                    >
                                        Edit
                                    </button>
                                </NavLink>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2"
                                    onClick={closeModal}
                                    aria-label='close'
                                >
                                    Close
                                </button>
                            </div>
                            <div className='modelpopupscrollcountainer'>
                                <div className='mpdelpopupcontentcontainer'>
                                    <div className='modelpopupleftequal'>
                                        <table className='w-full'>
                                            <tbody>
                                                <tr>
                                                    <td><strong>Name</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedBuyOrder.name && selectedBuyOrder.name.length > 0 ? (
                                                                <p className={`inline-flex rounded-full rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${changethebackgrounofthing(selectedBuyOrder.name)}`}>
                                                                    {selectedBuyOrder.name}
                                                                </p>
                                                            ) : (
                                                                <span>No name Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>price_per_unit</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedBuyOrder.price_per_unit > 0 ? (
                                                                <p className={`inline-flex rounded-full rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${changethebackgrounofthing(selectedBuyOrder.price_per_unit)}`}>
                                                                    {selectedBuyOrder.price_per_unit}
                                                                </p>
                                                            ) : (
                                                                <span>No price_per_unit Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>created_at</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedBuyOrder.created_at ? (
                                                                <p className={`inline-flex rounded-full rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${changethebackgrounofthing(selectedBuyOrder.created_at)}`}>
                                                                    {convertToAmPm(selectedBuyOrder.created_at)}
                                                                </p>
                                                            ) : (
                                                                <span>No created_at Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>timestamp</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedBuyOrder.timestamp ? (
                                                                <p className={`inline-flex rounded-full rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${changethebackgrounofthing(selectedBuyOrder.timestamp)}`}>
                                                                    {convertToAmPm(selectedBuyOrder.timestamp)}
                                                                </p>
                                                            ) : (
                                                                <span>No timestamp Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='modelpopuprightequal'>
                                        <table className='w-full'>
                                            <tbody>
                                                <tr>
                                                    <td><strong>Symbol</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedBuyOrder.symbol && selectedBuyOrder.symbol.length > 0 ? (
                                                                <p className={`inline-flex rounded-full rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${changethebackgrounofthing(selectedBuyOrder.symbol)}`}>
                                                                    {selectedBuyOrder.symbol}
                                                                </p>
                                                            ) : (
                                                                <span>No symbol Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>quantity</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedBuyOrder.quantity ? (
                                                                <p className={`inline-flex rounded-full rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${changethebackgrounofthing(selectedBuyOrder.quantity)}`}>
                                                                    {selectedBuyOrder.quantity}
                                                                </p>
                                                            ) : (
                                                                <span>No quantity Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>last_updated</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedBuyOrder.last_updated ? (
                                                                <p className={`inline-flex rounded-full rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${changethebackgrounofthing(selectedBuyOrder.last_updated)}`}>
                                                                    {convertToAmPm(selectedBuyOrder.last_updated)}
                                                                </p>
                                                            ) : (
                                                                <span>No last_updated Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Model>
                    )}
                </div>
            </div>
        </>
    );
};

export default Show_All_Buy_Orders;