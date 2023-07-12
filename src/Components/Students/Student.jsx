import { useEffect, useState } from "react";
import './stylestudent.css'
import axios from "axios";
import config from "../../qwe/config";

function Students() {
    const [darkMode, setDarkMode] = useState(true);
    const [student1, setStudent1] = useState([]);
    const [attendance2, setAttendance2] = useState([]);
    const [reyting, setReyting] = useState('');
    const [ani, setAni] = useState(true);

    const toggleDarkMode = () => { setDarkMode(!darkMode); };
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