import { useEffect, useState } from "react";
import './style.css'
import axios from "axios";
import config from "../../qwe/config";
import '../Auth/style.css'

function AdminPanel() {
    const [darkMode, setDarkMode] = useState(true);
    const [ani, setAni] = useState(true);

    const toggleDarkMode = () => { setDarkMode(!darkMode); };
    const admin = async () => {
        let data = await axios(`${config.url}/teachers`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        if (data.data.message === "No authorization on this route" || data.data.message === "Token is not defined" || data.data.message === "Token wrong") {
            window.location.replace('/')
        }
    }
    admin()
    useEffect(() => {
        setTimeout(() => {
            setAni(false)
        }, 4000);
    }, [])


    return (
        <>
            <div className={`App ${darkMode ? 'dark' : 'light'}`}>
                <main className=" bg-white dark:bg-gray-900 h-screen">
                    <div className="text-center fixed top-5  right-6">
                        <button onClick={toggleDarkMode} id="theme-toggle" type="button"
                            className="text-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-3 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                            <ion-icon name="invert-mode-outline"></ion-icon>
                        </button>
                    </div>
                    {ani && <div className='lol'>
                        <h4>
                            <span>Admin</span>
                            <span>Panel</span>
                        </h4>
                    </div>}
                    <div className="home w-full h-screen flex items-center justify-center gap-16">
                        <div
                            className="w-full max-w-sm bg-gray-200 dark:bg-gray-800 border  border-gray-200 dark:border-gray-700 rounded-lg shadow ">
                            <div className="admin flex justify-end px-4 pt-4"></div>
                            <div className="flex flex-col items-center pb-10">
                                <i className=" fa-solid fa-chalkboard-user text-5xl mb-3 text-gray-900 dark:text-white"></i>
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Teachers</h5>
                                <div className="flex mt-4 space-x-3 md:mt-6">
                                    <a href="/adminteacher"
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View</a>
                                </div>
                            </div>
                        </div>
                        <div
                            className="w-full max-w-sm bg-gray-200 dark:bg-gray-800 border  border-gray-200 dark:border-gray-700 rounded-lg shadow ">
                            <div className="admin flex justify-end px-4 pt-4"></div>
                            <div className="flex flex-col items-center pb-10">
                                <i className="fa-solid fa-graduation-cap text-5xl mb-3 text-gray-900 dark:text-white"></i>
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Students</h5>
                                <div className="flex mt-4 space-x-3 md:mt-6">
                                    <a href="/adminstudent"
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        View
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default AdminPanel