import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const Create_Expense = () => {
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [amount_given, setAmountgiven] = useState("false");
    const [status_done, setStatus] = useState("false");
    const [tag, setTag] = useState("");
    const [split_amount, setSplitamountbw] = useState("");
    const navigate = useNavigate();
    const parseCommaSeparatedString = (inputString) => {
        return inputString
            .split(',')
            .map(item => item.trim())
            .filter(item => item !== '');
    };
    const submitFeedback = async (e) => {
        e.preventDefault();
        const tags = parseCommaSeparatedString(tag)
        const split_amounts = parseCommaSeparatedString(split_amount)
        const token = localStorage.getItem('token');
        let given_amount= false
        if (amount_given=="false"){
            given_amount=false
        }
        else
        {
            given_amount=true
        }
        let done_status= false
        if (status_done=="false"){
            done_status=false
        }
        else
        {
            done_status=true
        }
        const response = await fetch(`http://127.0.0.1:8000/api/expenses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                amount: amount,
                description: description,
                tags: tags,
                split_amount:split_amounts,
                amount_given: given_amount,
                status_done: done_status
            }),
        });
        const data = await response.json();

        if (response.status === 200) {
            alert("Notes created successfully")
            navigate('/');

        } else {
            console.log("Error submitting Notes");
            // Optionally, you can handle success actions here
        }
    };

    return (
        <>
            <Breadcrumb pageName="Create Expenses" />

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">


                {/* <!-- Time and date --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Amount of the expense in int
                            </label>
                            <input
                                type="integer"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Write amount of the expense"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Tags of Expense (Ex. ideas,movies,etc) (seperated by ,)
                            </label>
                            <input
                                type="text"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                placeholder="Add tag"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                split between of Expense (Ex. ideas,movies,etc) (seperated by ,)
                            </label>
                            <input
                                type="text"
                                value={split_amount}
                                onChange={(e) => setSplitamountbw(e.target.value)}
                                placeholder="Add person with whom you want to split the expense"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Status of Expense
                            </label>
                            <select
                                value={status_done}
                                onChange={(e) => setStatus(e.target.value)}
                                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                                style={{ width: "100%", padding: "10px" }}
                            >
                                <option value="true">True</option>
                                <option value="false">False</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Amount Given 
                            </label>
                            <select
                                value={amount_given}
                                onChange={(e) => setAmountgiven(e.target.value)}
                                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                                style={{ width: "100%", padding: "10px" }}
                            >
                                <option value="true">True</option>
                                <option value="false">False</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>

                        <div >
                            {/*<div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark"> */}
                            <label className="mb-3 block text-black dark:text-white">
                            Description of the expense
                            </label>
                            <textarea
                                rows={6}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Write description of the expense here"
                                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                            ></textarea>
                        </div>
                        <div className="flex justify-center gap-4.5">
                            <button
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                                onClick={submitFeedback}
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

export default Create_Expense;