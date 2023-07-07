import { useEffect, useState } from "react";
import TeacherOneGroupTable from "./TeacherOneGroupTable";
import axios from "axios";
import config from "../../../qwe/config";

function TeacherOneGroup() {
    const [darkMode, setDarkMode] = useState(true);
    const [groups, setGroups] = useState([]);

    const toggleDarkMode = () => { setDarkMode(!darkMode); };
    const teacherGroups = async () => {
        let getId = await axios(`${config.url}/groups/getId`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        let grId1 = window.localStorage.getItem("grId")
        let data = await axios(`${config.url}/groups/students/${grId1}?idTeacher=${getId.data.id}`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        if (data.data.message === "No authorization on this route" || data.data.message === "Token is not defined" || data.data.message === "Token wrong") {
            window.location.replace('/')
        }
        setGroups(data.data.students)
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
                        <h1 className="text-gray-500 dark:text-gray-400 text-2xl">{window.localStorage.getItem('title')}</h1>
                        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
                            <TeacherOneGroupTable data={groups} th={["Full Name", "Overall score"]} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeacherOneGroup