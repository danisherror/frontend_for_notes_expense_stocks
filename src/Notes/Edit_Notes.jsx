import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

/**
 * Converts a comma-separated string into a list of trimmed items.
 * @param {string} inputString - The comma-separated string to be converted.
 * @returns {string[]} - An array of trimmed items.
 */
const parseCommaSeparatedString = (inputString) => {
  return inputString
    .split(',')
    .map(item => item.trim())
    .filter(item => item !== '');
};

const Edit_Notes = () => {
    const navigate = useNavigate();
    const { note_id } = useParams();
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [folder, setFolder] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [tag, setTag] = useState("");
    const [created_at, setCreated_at] = useState("");
    const [last_modified, setLast_modified] = useState("");
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    const submit_notes = async () => {
        const parsedTags = parseCommaSeparatedString(tag);

        const response = await fetch(`http://127.0.0.1:8000/api/notes/${note_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                content: content,
                tags: parsedTags,
                folder: folder,
                status: status,
                priority:priority ,
                created_at: created_at,
                last_modified: last_modified
            }),
        });

        if (response.status === 200) {
            alert("Note submitted successfully");
            navigate('/');
        } else {
            alert("Error submitting the note");
        }
    };

    const get_note_data = async () => {
        const res = await fetch(`http://127.0.0.1:8000/api/notes/${note_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (res.status === 200) {
            const data = await res.json();
            setTitle(data.title);
            setContent(data.content);
            setFolder(data.folder);
            setPriority(data.priority);
            setStatus(data.status);
            setTag(data.tags.join(', ')); // Convert array to a comma-separated string for input
            setCreated_at(data.created_at);
            setLast_modified(data.last_modified);
        } else {
            console.error("Error fetching note data");
        }
    };

    useEffect(() => {
        get_note_data();
    }, []);

    return (
        <>
            <Breadcrumb pageName="Edit Note" />

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
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
                            <label className="mb-3 block font-medium text-black dark:text-white">
                                Creation Time
                            </label>
                            <input
                                type="text"
                                value={created_at}
                                placeholder="Disabled label"
                                disabled
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block font-medium text-black dark:text-white">
                                Last Modified Time
                            </label>
                            <input
                                type="text"
                                value={last_modified}
                                placeholder="Disabled label"
                                disabled
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
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
                                Tags of Notes (Ex. ideas,movies,etc) (separated by ,)
                            </label>
                            <input
                                type="text"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                placeholder="Add tags"
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
                            </select>
                        </div>

                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Content
                            </label>
                            <textarea
                                rows={6}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write content of Notes here"
                                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                            ></textarea>
                        </div>
                        <div className="flex justify-center gap-4.5">
                            <button
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                type="submit"
                                onClick={submit_notes}
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

export default Edit_Notes;
