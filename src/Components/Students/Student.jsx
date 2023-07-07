import { useEffect, useState } from "react";
import './stylestudent.css'
import axios from "axios";
import config from "../../qwe/config";

function Students() {
    const [darkMode, setDarkMode] = useState(true);
    const [student, setStudent] = useState(false);
    const [profMod, setProfMod] = useState(false);
    const [student1, setStudent1] = useState([]);
    const [attendance1, setAttendance1] = useState(false);
    const [attendance2, setAttendance2] = useState([]);
    const [home, setHome] = useState(true);
    const [reyting, setReyting] = useState('');
    const [ani, setAni] = useState(true);


    const toggleDarkMode = () => { setDarkMode(!darkMode); };
    const studenCl = () => { setStudent(!student); };
    const attd = () => {
        setAttendance1(!attendance1)
        setProfMod(!profMod)
        setHome(!home)
    };
    const profMode = () => { setProfMod(!profMod); };
    const fetchStudent = async () => {
        let res = await axios.get(`${config.url}/students/profilest`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        let rey = 0
        for (let i = 0; i < res.data.data.attendance.length; i++) {
            rey += res.data.data.attendance[i].score
        }
        rey = rey / res.data.data.attendance.length
        setReyting(rey)
        if (res.data.message === "No authorization on this route" || res.data.message === "Token is not defined" || res.data.message === "Token wrong") {
            window.location.replace('/')
        }
        setStudent1(res.data.data);
        setAttendance2(res.data.data.attendance)
    }
    const getScore = async () => {
        setStudent(!student);
        setTimeout(async () => {
            alert(`Your overall score: ${reyting}`)
        }, 1);
    }
    const logout = async () => {
        let TOKEN = "none"
        window.localStorage.setItem('token', TOKEN)
        fetchStudent()
    }

    useEffect(() => {
        fetchStudent()
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
                                <span>Student</span>
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
                        {home && <div className="student w-full max-w-sm bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
                                            <a onClick={logout} href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</a>
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
                        </div>}
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
                                            </div>
                                            <p className="mb-1 text-xl  text-gray-900 dark:text-white"><strong>First Name : </strong>{student1.firstName}</p>
                                            <p className="mb-1 text-xl  text-gray-900 dark:text-white"><strong>Last Name : </strong>{student1.lastName}</p>
                                            <p className="mb-1 text-xl  text-gray-900 dark:text-white"><strong>Email : </strong>{student1.email}</p>
                                            <p className="mb-1 text-xl  text-gray-900 dark:text-white"><strong>Phone : </strong>{student1.phone}</p>
                                            <p className="mb-1 text-xl  text-gray-900 dark:text-white"><strong>Last Score : </strong>{student1?.attendance[student1.attendance.length - 1]?.score}</p>
                                            <div className="flex mt-4 space-x-3 md:mt-6">
                                                <h3 className="text-white">Attendance</h3>
                                                <a onClick={attd} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><ion-icon name="log-out-outline"></ion-icon></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {attendance1 && <div className="fixed z-50 w-full h-screen justify-center flex" aria-modal="true" role="dialog">
                            <div className="relative w-full">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <button onClick={attd} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="profile-modal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="container w-10/12 mx-auto py-12">
                                        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
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
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Students