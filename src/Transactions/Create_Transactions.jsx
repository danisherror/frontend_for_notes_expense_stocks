import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const Create_Transactions = () => {
    const [ammount, setAmmount] = useState(0);
    const [description, setDescription] = useState("");
    const [transaction_type, setTransactionType] = useState("UPI");
    const [status_done, setStatusDone] = useState("False");
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
        setDateTime(formattedDateTime);
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
                                Title of the Note
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Write Title of the Note"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Folder
                            </label>
                            <input
                                type="text"
                                value={folder}
                                onChange={(e) => setFolder(e.target.value)}
                                placeholder="Name of the folder in which this note is to be created"
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
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                                style={{ width: "100%", padding: "10px" }}
                            >
                                <option value="Incomplete">Incomplete</option>
                                <option value="Under Process">Under Process</option>
                                <option value="Partially complete">Partially complete</option>
                                <option value="Done">Done</option>
                                <option value="Important">Important</option>
                                <option value="Others">Others</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Priority of Note
                            </label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                                style={{ width: "100%", padding: "10px" }}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Don't Know">Don't Know</option>
                                <option value="Others">Others</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>

                        <div >
                            {/*<div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark"> */}
                            <label className="mb-3 block text-black dark:text-white">
                                Content
                            </label>
                            <textarea
                                rows={6}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write content of Notes herer"
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