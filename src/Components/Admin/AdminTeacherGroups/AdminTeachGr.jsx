import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../../qwe/config";
import AdminTeachGrTable from "./AdminTeachGrTable";

function AdminTeachGr() {
    const [darkMode, setDarkMode] = useState(true);
    const [groups, setGroups] = useState([]);

    const toggleDarkMode = () => { setDarkMode(!darkMode); };
    const teacherGroups = async () => {
        let data = await axios(`${config.url}/groups?idTeacher=${window.localStorage.getItem('teacherId')}`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        setGroups(data.data.data)
        if (data.data.message === "No authorization on this route" || data.data.message === "Token is not defined" || data.data.message === "Token wrong") {
            window.location.replace('/')
        }
    }
    useEffect(() => { teacherGroups() });
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
                        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
                            <AdminTeachGrTable data={groups} th={["title", "day", "time", "students"]} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminTeachGr