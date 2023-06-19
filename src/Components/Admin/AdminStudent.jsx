import { useEffect, useState } from "react";
import React from 'react';
import AdminStudentTable from "./AdminStudentTable";
import './style.css'
import config from "../../qwe/config";
import axios from "axios";

function AdminStudent() {
    let [students, setStudents] = useState([])
    let [spStudent, setSpStudent] = useState([])
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = () => { setDarkMode(!darkMode); };
    const fetchStudent = async () => {
        let res = await axios.get(`${config.url}/students`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        if (res.data.message === "No authorization on this route" || res.data.message === "Token is not defined" || res.data.message === "Token wrong") {
            window.location.replace('/')
        }
        setStudents(res.data.data);
    }

    const checkHuman = async (id) => {
        let res = await axios.get(`${config.url}/students/${id}`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        setSpStudent(res.data.data);
    };

    const editStudentFunc = async (id) => {
        let res = await axios.get(`${config.url}/teachers/${id}`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
    };

    useEffect(() => {
        fetchStudent()
    }, [])

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
                            <AdminStudentTable data={students} th={["firstName", "lastName", "phone", "motherNumber", "fatherNumber"]} spStudentFunc={checkHuman} spStudent={spStudent} editStudentFunc={editStudentFunc} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminStudent