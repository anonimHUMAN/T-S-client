import { useEffect, useState } from "react";
import './style.css'
import axios from "axios";
import config from "../../qwe/config";
import '../Auth/style.css'

function AdminPanel() {
    const [darkMode, setDarkMode] = useState(true);
    const [ani, setAni] = useState(true);
    const [exit, setExit] = useState(true);

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
    const logout = () => {
        let check = confirm('Are you sure you want to leave the website?')
        if (check) {
            let TOKEN = "none"
            window.localStorage.setItem('token', TOKEN)
            admin()
        }
    };
    useEffect(() => {
        setTimeout(() => {
            setAni(false)
        }, 4000);
    }, [])

    return (
        <>
            <div className={`App ${darkMode ? 'dark' : 'light'}`}>
                <main className="bg-white dark:bg-gray-900 h-screen">
                    <div className="text-center fixed top-5 right-6">
                        <i onClick={logout} className="text-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-3 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"><ion-icon name="exit-outline"></ion-icon></i>
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
                    {/* {exit && <div className="absolute top-0 right-0 z-50 p-4 md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-6 text-center">
                                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                    <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                        Yes, I'm sure
                                    </button>
                                    <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>} */}
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