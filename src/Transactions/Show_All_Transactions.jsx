import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from 'react-router-dom'
import Model from 'react-modal'
Model.setAppElement("#root");
const Show_All_Transactions = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransactions, setSelectedTransactions] = useState(null);
    const openModal = (transactions) => {
        setSelectedTransactions(transactions);
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setSelectedTransactions(null);
        setIsModalOpen(false);
    }
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    const getdata = async () => {

        const res = await fetch(`http://127.0.0.1:8000/api/transactions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (res.status === 200) {
            setTransactions(data)
        }
        else {
            console.error("404 Error: Resource not found");
        }
    }
    const deleteTransaction = async (id) => {
        const data = transactions.find(issue => issue.id === id);
        if (data.status_done == true) {
            alert("This Transactions is already closed, cannot be deleted");
        }
        else {
            const confirmation = window.confirm("Are you sure you want to delete this Transactions?");
            if (confirmation) {

                const res = await fetch(`http://127.0.0.1:8000/api/transactions/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (res.status === 200) {
                    alert("Transactions deleted successfully")
                    navigate('/');
                }
                else {
                    console.error("404 Error: Resource not found");
                }
            }
        }
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
            case true:
                return 'bg-primary text-primary';
            case false:
                return 'bg-secondary text-secondary';
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
                return 'bg-primary text-primary';
        }
    }

    useEffect(() => {
        getdata();
    }, [])


    return (
        <>
            <Breadcrumb pageName="Show Transactions" />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

                <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Transaction Type
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Second Party
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
                            {transactions.map((transaction, key) => (
                                <tr key={key}>

                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {transaction.transaction_type}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {transaction.second_party}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">

                                        <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            onClick={() => openModal(transaction)}
                                        >
                                            View</button>
                                    </td>

                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <NavLink to={`/transactions/edit_transaction/${transaction.id}`}>
                                            <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            >
                                                edit</button></NavLink>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">

                                        <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            onClick={() => deleteTransaction(transaction.id)}
                                        >
                                            Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='max-w-full overflow-x-auto'>
                    {selectedTransactions && (
                        <Model
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            contentLabel="Transaction Details"
                            className="modal"
                            overlayClassName="overlay"
                        >
                            <div className='modelpopupbuttoncontainer'>
                                <NavLink to={`/transactions/edit_transaction/${selectedTransactions.id}`}>
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
                                                selectedTransactions.description ? (
                                                    selectedTransactions.description
                                                ) : (
                                                    <span>No Description available</span>
                                                )}
                                        </p>
                                    </div>
                                    <div className='modelpopupright'>
                                        <table className='w-full'>
                                            <tbody>
                                                <tr>
                                                    <td><strong>amount</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedTransactions.amount ? (
                                                                <p className={`inline-flex rounded-full rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${changethebackgrounofthing(selectedTransactions.amount)}`}>
                                                                    {selectedTransactions.amount}
                                                                </p>
                                                            ) : (
                                                                <span>False</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Second Party</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedTransactions.second_party ? (
                                                                <p className={`inline-flex rounded-full rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${changethebackgrounofthing(selectedTransactions.second_party)}`}>
                                                                    {selectedTransactions.second_party}
                                                                </p>
                                                            ) : (
                                                                <span>No Second Party Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Status</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedTransactions.status_done ? (
                                                                <p className={`inline-flex rounded-full rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${changethebackgrounofthing(selectedTransactions.status_done)}`}>
                                                                    True
                                                                </p>
                                                            ) : (
                                                                <span>False</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Tags</strong></td>
                                                    <td>
                                                        {
                                                            selectedTransactions.tags && selectedTransactions.tags.length > 0 ? (
                                                                <ul>
                                                                    {selectedTransactions.tags.map((tag, index) => (
                                                                        <li key={index} className='inline-block mr-2 bg-grey-200 rounded-full px-2 py-1 text-sm'>
                                                                            <p className={`inline-flex rounded-full rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${changethebackgrounofthing(tag)}`}>
                                                                                {tag}
                                                                            </p>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <span>No tag Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>transaction_type</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedTransactions.transaction_type ? (
                                                                <p className={`inline-flex rounded-full rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${changethebackgrounofthing(selectedTransactions.transaction_type)}`}>
                                                                    {selectedTransactions.transaction_type}
                                                                </p>
                                                            ) : (
                                                                <span>No Transaction Type Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Transaction date</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedTransactions.transaction_date && selectedTransactions.transaction_date.length > 0 ? (
                                                                <span>{convertToAmPm(selectedTransactions.transaction_date)}</span>

                                                            ) : (
                                                                <span>No Transaction date Available</span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>created at</strong></td>
                                                    <td className='py-5'>
                                                        {
                                                            selectedTransactions.created_at && selectedTransactions.created_at.length > 0 ? (
                                                                <span>{convertToAmPm(selectedTransactions.created_at)}</span>

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
                                                            selectedTransactions.last_modified && selectedTransactions.last_modified.length > 0 ? (
                                                                <span>{convertToAmPm(selectedTransactions.last_modified)}</span>

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
                            </div>
                        </Model>
                    )}
                </div>
            </div>
        </>
    );
};

export default Show_All_Transactions;