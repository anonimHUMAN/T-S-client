import { useEffect, useState } from "react";
import './style.css'
import axios from "axios";
import config from "../../qwe/config";

function Teachers() {
    const [darkMode, setDarkMode] = useState(true);
    const [group, setGroup] = useState(false);
    const [ani, setAni] = useState(true);

    const toggleDarkMode = () => { setDarkMode(!darkMode); };
    const teacher = async () => {
        let data = await axios(`${config.url}/teachers`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        if (data.data.message === "No authorization on this route" || data.data.message === "Token is not defined" || data.data.message === "Token wrong") {
            window.location.replace('/')
        }
    }
    teacher()
    useEffect(() => {
        setTimeout(() => {
            setAni(false)
        }, 4000);
    }, [])

    return (
        <>
            <div className={`App ${darkMode ? 'dark' : 'light'}`}>
                <div className="w-full h-screen dark:bg-gray-700">
                    {ani && <div className='lol'>
                        <h4>
                            <span>Teacher</span>
                            <span>Room</span>
                        </h4>
                    </div>}
                    <div className="home w-full h-screen flex items-center justify-center gap-16">
                        <div className="dark text-right fixed top-5  right-6">
                            <button onClick={toggleDarkMode} id="theme-toggle" type="button"
                                className="text-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-3 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                                <ion-icon name="invert-mode-outline"></ion-icon>
                            </button>
                        </div>
                        <div
                            className="w-full max-w-sm bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="teacher flex justify-end px-4 pt-4">
                                {group && <div id="dropdown" className="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 block" data-popper-placement="bottom">
                                    <ul className="py-2" aria-labelledby="dropdownButton">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                        </li>
                                    </ul>
                                </div>}
                            </div>
                            <div className="flex flex-col items-center pb-10">
                                <i className="fa-solid fa-users-rectangle text-5xl mb-3 text-gray-900 dark:text-white"></i>
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Groups</h5>
                                <div className="flex mt-4 space-x-3 md:mt-6">
                                    <a href="/teachergroups"
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* <div
                            className="w-full max-w-sm bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-end px-4 pt-4"></div>
                            <div className="flex flex-col items-center pb-10">
                                <i className="fa-solid fa-graduation-cap text-5xl mb-3 text-gray-900 dark:text-white"></i>
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Students</h5>
                                <div className="flex mt-4 space-x-3 md:mt-6">
                                    <a href="/teacherstudents"
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View
                                    </a>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Teachers