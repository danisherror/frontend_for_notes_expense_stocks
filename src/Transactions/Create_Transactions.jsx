import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const Create_Transactions = () => {
    const [ammount, setAmmount] = useState(0);
    const [description, setDescription] = useState("");
    const [transaction_type, setTransactionType] = useState("UPI");
    const [status_done, setStatusDone] = useState("false");
    const [second_party, setSecondParty] = useState("Unknown");
    const [transaction_date, setTransactionDate] = useState("UPI");
    const [tag, setTag] = useState("");
    const navigate = useNavigate();
    const parseCommaSeparatedString = (inputString) => {
        return inputString
            .split(',')
            .map(item => item.trim())
            .filter(item => item !== '');
    };
    const handleInputChange = (event) => {
        const inputDateTime = new Date(event.target.value);
        const formattedDateTime = inputDateTime.toISOString();
        setTransactionDate(formattedDateTime);
      };
    const submitFeedback = async (e) => {
        e.preventDefault();
        const tags = parseCommaSeparatedString(tag)
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/transactions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "amount": ammount,
                "description": description,
                "tags": tags,
                "transaction_type": transaction_type,
                "transaction_date": transaction_date,
                "status_done": status_done,
                "second_party": second_party
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
            <Breadcrumb pageName="Create Transaction" />

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">


                {/* <!-- Time and date --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                               Amount of transaction in INT
                            </label>
                            <input
                                type="text"
                                value={ammount}
                                onChange={(e) => setAmmount(e.target.value)}
                                placeholder="write Amount of the transaction"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                           Date of Transaction
                            </label>
                            <input
                                type="datetime-local"
                                id="datetime"
                                onChange={handleInputChange}
                                placeholder="Time of the transaction"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                            Second Party
                            </label>
                            <input
                                type="text"
                                value={second_party}
                                onChange={(e) => setSecondParty(e.target.value)}
                                placeholder="Name of the Second party in the transaction"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Tags of Notes (Ex. ideas,movies,etc) (seperated by ,)
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
                                Status of Note
                            </label>
                            <select
                                value={status_done}
                                onChange={(e) => setStatusDone(e.target.value)}
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
                            Transaction Type
                            </label>
                            <select
                                value={transaction_type}
                                onChange={(e) => setTransactionType(e.target.value)}
                                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                                style={{ width: "100%", padding: "10px" }}
                            >
                                <option value="UPI">UPI</option>
                                <option value="Cash">Cash</option>
                                <option value="Bank to Bank">Bank to Bank</option>
                                <option value="Lending Money">Lending Money</option>
                                <option value="Others">Others</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>

                        <div >
                            {/*<div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark"> */}
                            <label className="mb-3 block text-black dark:text-white">
                            description
                            </label>
                            <textarea
                                rows={6}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Write Description of Notes herer"
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

export default Create_Transactions;