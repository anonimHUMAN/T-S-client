import { useEffect, useState } from "react";
import './stylestudent.css'
import axios from "axios";
import config from "../../qwe/config";

function Students() {
    const [darkMode, setDarkMode] = useState(true);
    const [student, setStudent] = useState(false);
    const [profMod, setProfMod] = useState(false);
    const [student1, setStudent1] = useState([]);

    const toggleDarkMode = () => { setDarkMode(!darkMode); };
    const studenCl = () => { setStudent(!student); };
    const profMode = () => { setProfMod(!profMod); };
    const fetchStudent = async () => {
        let res = await axios.get(`${config.url}/students/profilest`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        if (res.data.message === "No authorization on this route" || res.data.message === "Token is not defined" || res.data.message === "Token wrong") {
            window.location.replace('/')
        }
        setStudent1(res.data.data);
    }
    const getScore = async () => {
        setStudent(!student);
        setTimeout(async () => {
            let res = await axios.get(`${config.url}/students/onescore`, {
                headers: {
                    authorization: window.localStorage.getItem("token")
                }
            })
            let reyting = res.data.score
            if (res.data.message === "No authorization on this route" || res.data.message === "Token is not defined" || res.data.message === "Token wrong") {
                window.location.replace('/')
            }
            alert(`Your reyting: ${reyting}`)
        }, 1);
    }
    const logout = async () => {
        let TOKEN = "none"
        window.localStorage.setItem('token', TOKEN)
        fetchStudent()
    }

    useEffect(() => {
        fetchStudent()
    }, [])

    return (
        <>
            <div className={`App ${darkMode ? 'dark' : 'light'}`}>
                <div className="w-full h-screen dark:bg-gray-700">
                    <div className="home w-full h-screen flex items-center justify-center gap-16">
                        <div className="dark text-right fixed top-5  right-6">
                            <button onClick={toggleDarkMode} id="theme-toggle" type="button"
                                className="text-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-3 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                                <ion-icon name="invert-mode-outline"></ion-icon>
                            </button>
                            <button id="theme-toggle" type="button" className="text-right text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                                <svg id="theme-toggle-dark-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                                <svg id="theme-toggle-light-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                        <div className="student w-full max-w-sm bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-end px-4 pt-4">
                                <button onClick={studenCl} id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                                    <span className="sr-only">Open dropdown</span>
                                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                                </button>
                                {student && <div id="dropdown" className="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 block" data-popper-placement="bottom">
                                    <ul className="py-2" aria-labelledby="dropdownButton">
                                        <li>
                                            <a onClick={getScore} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My reyting</a>
                                        </li>
                                        <li>
                                            <a onClick={logout} href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                        </li>
                                    </ul>
                                </div>}
                            </div>
                            <div className="flex flex-col items-center pb-10">
                                <img className="w-14 h-14 mb-3 rounded-full shadow-lg" src="https://cdn3.iconfinder.com/data/icons/education-flat-icon-1/130/148-512.png" />
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">My Profile</h5>
                                <div className="flex mt-4 space-x-3 md:mt-6">
                                    <a onClick={profMode} data-modal-target="profile-modal" data-modal-toggle="profile-modal" href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View</a>
                                </div>
                            </div>
                        </div>
                        {profMod && <div id="profile-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex" aria-modal="true" role="dialog">
                            <div className="relative w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <button onClick={profMode} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="profile-modal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="w-full max-w-md p-3  border-none bg-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 ">
                                        <div className="flex flex-col pb-10">
                                            <div className="Profile flex items-center ">
                                                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://cdn2.vectorstock.com/i/1000x1000/76/01/education-icon-male-student-person-profile-avatar-vector-25957601.jpg" />
                                                <p className="text-yellow-300 ml-3 text-1xl">13<i className="fa-solid fa-arrow-up ml-1 text-yellow-300 "></i></p>
                                            </div>
                                            <p className="mb-1 text-xl  text-gray-900 dark:text-white"><strong>First Name : </strong>{student1.firstName}</p>
                                            <p className="mb-1 text-xl  text-gray-900 dark:text-white"><strong>Last Name : </strong>{student1.lastName}</p>
                                            <p className="mb-1 text-xl  text-gray-900 dark:text-white"><strong>Email : </strong>{student1.email}</p>
                                            <p className="mb-1 text-xl  text-gray-900 dark:text-white"><strong>Phone : </strong>{student1.phone}</p>
                                            <div className="flex mt-4 space-x-3 md:mt-6">
                                                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className="fa-solid fa-user-plus"></i></a>
                                                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"><i className="fa-solid fa-message"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Students