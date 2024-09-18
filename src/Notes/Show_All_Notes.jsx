import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from 'react-router-dom'
import Model from 'react-modal'
Model.setAppElement("#root");
const Show_All_Notes = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const openModal = (note) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setSelectedNote(null);
        setIsModalOpen(false);
    }
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const changethebackgrounofthing = (thing) => {
        switch (thing) {
            case "Closed":
                return "#ff9999";
            case "Open":
                return 'bg-primary text-primary';
            case "In Progress":
                return 'bg-success text-success';
            default:
                return 'bg-info text-info';
        }
    }
    const token = getToken();

    const getdata = async () => {

        const res = await fetch(`http://127.0.0.1:8000/api/notes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (res.status === 200) {
            setNotes(data)
        }
        else {
            console.error("404 Error: Resource not found");
        }
    }
    const deleteNote = async (id) => {
        const data = notes.find(issue => issue.id === id);
        if (data.status === "Closed") {
            alert("This Note is already closed, cannot be deleted");
        }
        else {
            const confirmation = window.confirm("Are you sure you want to delete this Note?");
            if (confirmation) {

                const res = await fetch(`http://127.0.0.1:8000/api/notes/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (res.status === 200) {
                    alert("Note deleted successfully")
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
            <Breadcrumb pageName="Room Complaints" />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

                <div className="scroll-container" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Title
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
                            {notes.map((note, key) => (
                                <tr key={key}>

                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {note.title}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">

                                        <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            onClick={() => openModal(note)}
                                        >
                                            View</button>
                                    </td>


                                    {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${note.status === 'Pending'
                                                ? 'bg-danger text-danger'
                                                :
                                                'bg-success text-success'

                                                }`}
                                        >
                                            {note.status}
                                        </p>

                                    </td> */}

                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <NavLink to={`/notes/edit_note/${note.id}`}>
                                            <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            >
                                                edit</button></NavLink>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">

                                        <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            onClick={() => deleteNote(note.id)}
                                        >
                                            Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {selectedNote && (
                        <Model
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            contentLabel="Note Details"
                            className="modal"
                            overlayClassName="overlay"
                        >
                            <h2>
                                {
                                    selectedNote.title && selectedNote.title.length > 0 ? (
                                        selectedNote.title
                                    ) : (
                                        <span>No Title available</span>
                                    )}
                            </h2>
                            <div className='modelpopupbuttoncontainer'>
                                <NavLink to={`/notes/edit_note/${selectedNote.id}`}>
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
                                                selectedNote.description && selectedNote.description.length > 0 ? (
                                                    selectedNote.description
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
                                                            selectedNote.status && selectedNote.status.length > 0 ? (
                                                                <p className={`inline-flex rounded-full rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${changethebackgrounofthing(selectedNote.status)}`}>
                                                                    {selectedNote.status}
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
                                                            selectedNote.status && selectedNote.status.length > 0 ? (
                                                                <ul>
                                                                    {selectedNote.tags.map((tag, index) => (
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

export default Show_All_Notes;