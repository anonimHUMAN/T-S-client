import { useEffect, useRef, useState } from "react";
import './style.css'
import axios from "axios";
import config from "../../qwe/config";

function Teachers() {
    const [darkMode, setDarkMode] = useState(true);
    const [group, setGroup] = useState(false);
    const [ani, setAni] = useState(true);
    const [pass, setPass] = useState(false);
    const [pass1, setPass1] = useState(false);

    let inp = useRef(null)
    let inp1 = useRef(null)
    let inp2 = useRef(null)

    const toggleDarkMode = () => { setDarkMode(!darkMode); };
    const togglePass = () => { setPass(!pass); };
    const editPass = () => {
        setPass1(!pass1)
        setPass(false)
    };
    const subPass = async () => {
        if (inp.current.value === '' || inp1.current.value === '' || inp2.current.value === '') {
            alert("Complete all inputs!!!")
        } else {
            let data = {
                email: inp.current.value,
                oldPassword: inp1.current.value,
                newPassword: inp2.current.value
            }
            let res = await axios.post(`${config.url}/teachers/password`, data, {
                headers: {
                    authorization: window.localStorage.getItem("token")
                }
            })
            if (res.data.message === "User not found!") {
                alert(res.data.message)
            } else if (res.data.message === "Old password incorrect!") {
                alert(res.data.message)
            } else if (res.data.message === "Password succesfully edited...") {
                alert(res.data.message)
            }
        }
    }
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
    const logout = () => {
        let check = confirm('Are you sure you want to leave the website?')
        if (check) {
            let TOKEN = "none"
            window.localStorage.setItem('token', TOKEN)
            teacher()
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
                <div className="w-full h-screen dark:bg-gray-700">
                    {ani && <div className='lol'>
                        <h4>
                            <span>Teacher</span>
                            <span>Room</span>
                        </h4>
                    </div>}
                    <div className="home w-full h-screen flex items-center justify-center gap-16">
                        <div className="dark text-right fixed top-5 right-6">
                            <button onClick={togglePass} className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                                <span className="sr-only">Open dropdown</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                            </button>
                            {pass && <div id="dropdown" className="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                <div className="py-2 mt-2" aria-labelledby="dropdownButton">
                                    <i onClick={logout} className="text-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-3 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">Logout <ion-icon name="exit-outline"></ion-icon></i>
                                    <h1 onClick={editPass} className="block cursor-pointer px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit password</h1>
                                </div>
                            </div>}
                            <button onClick={toggleDarkMode} id="theme-toggle" type="button"
                                className="text-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-3 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                                <ion-icon name="invert-mode-outline"></ion-icon>
                            </button>
                        </div>
                        {pass1 && <div id="authentication-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex" aria-modal="true" role="dialog">
                            <div className="relative max-h-full">
                                <div className="w-full relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <button type="button" onClick={editPass} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="w-full px-6 py-6 lg:px-8 flex flex-col">
                                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit password</h3>
                                        <input ref={inp} type="text" id="simple-search" className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required="" />
                                        <input ref={inp1} type="text" id="simple-search" className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Old password" required="" />
                                        <input ref={inp2} type="text" id="simple-search" className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New password" required="" />
                                        <button onClick={subPass} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {pass1 && <div className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>}
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