import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, useParams } from 'react-router-dom'
import Model from 'react-modal'
Model.setAppElement("#root");
const Show_All_Buy_Orders = () => {
    const navigate = useNavigate();
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

        const res = await fetch(`http://127.0.0.1:8000/api/buy_stocks`, {
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
            console.error("404 Error: Resource not found");
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
                                            {buyorder.timestamp}
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
                            {/* <h2>
                                {
                                    selectedBuyOrder.title && selectedBuyOrder.title.length > 0 ? (
                                        selectedBuyOrder.title
                                    ) : (
                                        <span>No Title available</span>
                                    )}
                            </h2>
                            <div className='modelpopupbuttoncontainer'>
                                <NavLink to={`/notes/edit_note/${selectedBuyOrder.id}`}>
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
                                    <div className='modelpopupleft'>
                                        <h1>
                                            <span style={{ color: 'rgb(112,48,160)' }}>Description</span>
                                        </h1>
                                        <p>
                                            {
                                                selectedBuyOrder.content ? (
                                                    selectedBuyOrder.content
                                                ) : (
                                                    <span>No Description available</span>
                                                )}
                                        </p>
                                    </div>
                                    <div className='modelpopupright'>
                                        <table className='w-full'>
                                            <tbody>
                                                <tr>
                                                    <td><strong>Status</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedBuyOrder.status && selectedBuyOrder.status.length > 0 ? (
                                                                <p className={`inline-flex rounded-full rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${changethebackgrounofthing(selectedBuyOrder.status)}`}>
                                                                    {selectedBuyOrder.status}
                                                                </p>
                                                            ) : (
                                                                <span>No status Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Tags</strong></td>
                                                    <td>
                                                        {
                                                            selectedBuyOrder.status && selectedBuyOrder.status.length > 0 ? (
                                                                <ul>
                                                                    {selectedBuyOrder.tags.map((tag, index) => (
                                                                        <li key={index} className='inline-block mr-2 bg-grey-200 rounded-full px-2 py-1 text-sm'>
                                                                            <p className={`inline-flex rounded-full rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${changethebackgrounofthing(tag)}`}>
                                                                                {tag}
                                                                            </p>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <span>No status Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>priority</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedBuyOrder.priority && selectedBuyOrder.priority.length > 0 ? (
                                                                <p className={`inline-flex rounded-full rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${changethebackgrounofthing(selectedBuyOrder.priority)}`}>
                                                                    {selectedBuyOrder.priority}
                                                                </p>
                                                            ) : (
                                                                <span>No priority Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>folder</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedBuyOrder.folder && selectedBuyOrder.folder.length > 0 ? (
                                                                <span>{selectedBuyOrder.folder}</span>

                                                            ) : (
                                                                <span>No folder Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>created at</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedBuyOrder.created_at && selectedBuyOrder.created_at.length > 0 ? (
                                                                <span>{convertToAmPm(selectedBuyOrder.created_at)}</span>

                                                            ) : (
                                                                <span>No created at Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>last modified</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedBuyOrder.last_modified && selectedBuyOrder.last_modified.length > 0 ? (
                                                                <span>{convertToAmPm(selectedBuyOrder.last_modified)}</span>

                                                            ) : (
                                                                <span>No last modified Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div> */}
                            h1
                        </Model>
                    )}
                </div>
            </div>
        </>
    );
};

export default Show_All_Buy_Orders;