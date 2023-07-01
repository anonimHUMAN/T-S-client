import { useEffect, useState } from "react";
import config from "../../../qwe/config";
import axios from "axios";

function ShowAttendance777() {
    const [darkMode, setDarkMode] = useState(true);
    const [attendance, setAttendance] = useState([]);
    const toggleDarkMode = () => { setDarkMode(!darkMode); };

    const seeAtt = async () => {
        let res = await axios(`${config.url}/routeTeacher/attend1?idStudent=${window.localStorage.getItem('StId')}`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        setAttendance(res.data.data.attendance)
    }
    useEffect(() => { seeAtt() });
    return (
        <>
            <div className={`App ${darkMode ? 'dark' : 'light'}`}>
                <div className="bg-white dark:bg-gray-900 h-screen pt-10">
                    <div className="text-center fixed top-5  right-6">
                        <button onClick={toggleDarkMode} id="theme-toggle" type="button"
                            className="text-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-3 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                            <ion-icon name="invert-mode-outline"></ion-icon>
                        </button>
                    </div>
                    <div className="container w-10/12 mx-auto py-12">
                        <h1 className="text-gray-500 dark:text-gray-400 text-2xl">{window.localStorage.getItem('title')}</h1>
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
                                    {attendance.map((item, i) => {
                                        return (
                                            <tr key={item._id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-10 dark:text-white">
                                                    {i + 1}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {item.status == "+" && "✅"}
                                                    {item.status == "-" && "❌"}
                                                    {/* {item.reason == false && 1}
                                                    {item.reason != false && 2} */}
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
        </>
    )
}

export default ShowAttendance777