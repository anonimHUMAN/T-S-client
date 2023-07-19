import { useEffect, useRef, useState } from "react";
import './stylestudent.css'
import axios from "axios";
import config from "../../qwe/config";

function Students() {
    const [darkMode, setDarkMode] = useState(true);
    const [student1, setStudent1] = useState([]);
    const [attendance2, setAttendance2] = useState([]);
    const [reyting, setReyting] = useState('');
    const [ani, setAni] = useState(true);
    const [pass1, setPass1] = useState(false);

    let inp = useRef(null)
    let inp1 = useRef(null)
    let inp2 = useRef(null)

    const toggleDarkMode = () => { setDarkMode(!darkMode); };
    const editPass = () => {
        setPass1(!pass1)
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
            let res = await axios.post(`${config.url}/students/password`, data, {
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
    const fetchStudent = async () => {
        let res = await axios.get(`${config.url}/students/profilest`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        if (res.data.message === "No authorization on this route" || res.data.message === "Token is not defined" || res.data.message === "Token wrong") {
            window.location.replace('/')
        }
        let rey = 0
        for (let i = 0; i < res.data.data.attendance.length; i++) {
            rey += res.data.data.attendance[i].score
        }
        rey = rey / res.data.data.attendance.length
        setReyting(rey)
        setStudent1(res.data.data);
        setAttendance2(res.data.data.attendance)
    }
    const logout = () => {
        let check = confirm('Are you sure you want to leave the website?')
        if (check) {
            let TOKEN = "none"
            window.localStorage.setItem('token', TOKEN)
            fetchStudent()
        }
    };

    useEffect(() => {
        fetchStudent()
        setTimeout(() => {
            setAni(false)
        }, 4000);
    }, [])

    return (
        <>
            <div className={`App ${darkMode ? 'dark' : 'light'}`}>
                {ani && <div className="w-full bg-white fixed z-50 top-0 right-0 left-0 bottom-0">
                    <div className='lol'>
                        <h4>
                            <span>Student</span>
                            <span>Room</span>
                        </h4>
                    </div>
                </div>}
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
                <div className="w-full h-screen dark:bg-gray-700 flex justify-end">
                    <nav className="fixed top-0 right-0 left-0 z-40 w-full flex justify-between items-center mx-auto bg-white border-gray-200 dark:bg-gray-900 p-4">
                        <a className="flex items-center">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Student Room</span>
                        </a>
                        <div>
                            <button onClick={logout} className="text-sm text-blue-600 dark:text-blue-500 hover:underline mr-4">Logout</button>
                            <button onClick={toggleDarkMode} id="theme-toggle" type="button"
                                className="text-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-3 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                                <ion-icon name="invert-mode-outline"></ion-icon>
                            </button>
                        </div>
                    </nav>
                    <aside id="logo-sidebar" className="fixed top-0 left-0 z-30 w-80 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                            <ul className="space-y-2 font-medium">
                                <li>
                                    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <span className="ml-3"><span className="text-green-400">Name:</span> {student1.firstName}</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <span className="ml-3"><span className="text-green-400">Surname:</span> {student1.lastName}</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <span className="ml-3"><span className="text-green-400">Email:</span> {student1.email}</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <span className="ml-3"><span className="text-green-400">Phone:</span> {student1.phone}</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <span className="ml-3"><span className="text-green-400">Overall Score:</span> {reyting}</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={editPass} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <span className="text-green-400">Change password </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <div className="w-9/12 p-4 sm:ml-64">
                        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-900 mt-20">
                            <div className="w-full justify-center flex" aria-modal="true" role="dialog">
                                <div className="relative w-full">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div className="container w-10/12 mx-auto py-12">
                                            <div className="relative shadow-xl sm:rounded-lg">
                                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-400 uppercase bg-gray-200 dark:bg-gray-700 dark:text-white">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3">
                                                                #
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Status
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Date
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Score
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {attendance2.map((item, i) => {
                                                            return (
                                                                <tr key={item._id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                    <th scope="row"
                                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-10 dark:text-white">
                                                                        {i + 1}
                                                                    </th>
                                                                    <td className="px-6 py-4">
                                                                        {item.status == "+" && "✅"}
                                                                        {item.status == "-" && "❌"}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {item.time}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {item.score}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Students