import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from 'react-router-dom'
const Show_All_Expenses = () => {
    const navigate = useNavigate();
    const [expenses, setexpenses] = useState([]);
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    const getdata = async () => {

        const res = await fetch(`http://127.0.0.1:8000/api/expenses`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (res.status === 200) {
            setexpenses(data)
        }
        else {
            console.error("404 Error: Resource not found");
        }
    }
    const deleteExpense = async (id) => {
        const data = expenses.find(issue => issue.id === id);
        if (data.status === true) {
            alert("This expense is already closed, cannot be deleted");
        }
        else {
            const confirmation = window.confirm("Are you sure you want to delete this expense?");
            if (confirmation) {

                const res = await fetch(`http://127.0.0.1:8000/api/expenses/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (res.status === 200) {
                    alert("expense deleted successfully")
                    navigate('/');
                }
                else {
                    console.error("404 Error: Resource not found");
                }
            }
        }
    }

    useEffect(() => {
        getdata();
    }, [])


    return (
        <>
            <Breadcrumb pageName="Expenses" />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

                <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Amount
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Description
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Tags
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Split Between
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Amount Given
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Status Done
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    created_at
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    last_modified
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
                            {expenses.map((expense, key) => (
                                <tr key={key}>

                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {expense.amount}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {expense.description}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {expense.tags}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {expense.split_amount}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {expense.amount_given}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {expense.status_done}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {expense.created_at}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {expense.last_modified}
                                        </p>
                                    </td>


                                    {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${expense.status === 'Pending'
                                                ? 'bg-danger text-danger'
                                                :
                                                'bg-success text-success'

                                                }`}
                                        >
                                            {expense.status}
                                        </p>

                                    </td> */}

                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <NavLink to={`/expenses/edit_expense/${expense.id}`}>
                                            <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            >
                                                edit</button></NavLink>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">

                                        <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            onClick={() => deleteExpense(expense.id)}
                                        >
                                            Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Show_All_Expenses;