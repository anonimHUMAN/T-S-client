import axios from "axios"
import { useEffect, useState } from "react"
import config from "../../../qwe/config"
export default ({ data, th }) => {
    const [showS, setShowS] = useState(false)
    const [students, setStudents] = useState([])
    console.log();
    const toggleShow = () => { setShowS(!showS) }
    const getTotal = async () => {
        let res = await axios.get(`${config.url}/routeTeacher/total?idTeacher=${window.localStorage.getItem("teacherId")}&idGroup=${window.localStorage.getItem("grId")}`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
    }
    const getAllStudents = async () => {
        let res = await axios.get(`${config.url}/teachers/students`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        setStudents(res.data.data)
    }
    const addStudentToGroup = async (id) => {
        let data = {
            idTeacher: `${window.localStorage.getItem("teacherId")}`,
            idGroup: `${window.localStorage.getItem("grId")}`,
            idStudent: `${id}`
        }
        let res = await axios.post(`${config.url}/teachers/manage`, data, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        alert(res.data.title)
    }
    const delStudent = async (id) => {
        let res = await axios.delete(`${config.url}/admin/manage?idTeacher=${window.localStorage.getItem("teacherId")}&idGroup=${window.localStorage.getItem("grId")}&idStudent=${id}`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        alert(res.data.title)
    };

    useEffect(() => {
        getAllStudents()
        getTotal()
    }, [])
    return (
        <>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-400 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        {th.map((item, i) => {
                            return <th key={i} scope="col">{item}</th>
                        })}
                        <th scope="col" className="px-6 py-3 text-left w-32">
                            <button onClick={toggleShow}>
                                <i className="fa-solid fa-square-plus"></i>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => {
                        return (
                            <tr key={item._id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-10 dark:text-white">
                                    {i + 1}
                                </th>
                                <td className="px-6 py-4">
                                    {item.firstName}<span> </span>{item.lastName}
                                </td>
                                <td className="px-6 py-4">
                                    {item.totalScore}
                                </td>
                                <td scope="col" className="px-6 py-3 text-left w-32">
                                    <button onClick={() => { delStudent(item._id) }}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {showS && <div id="authentication-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex" aria-modal="true" role="dialog">
                <div className="relative w-10/12 max-h-full">
                    <div className="w-full relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={toggleShow} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="w-full px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">All Students</h3>
                            <div className="bg-white dark:bg-gray-900 h-screen pt-10">
                                <div className="container w-10/12 mx-auto py-12">
                                    <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-white">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        #
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Surname
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Email
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Phone
                                                    </th>
                                                    <th scope="col" className="px-6 py-3"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {students.map((item, i) => {
                                                    return (
                                                        <tr key={item._id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <th scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-10 dark:text-white">
                                                                {i + 1}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                {item.firstName}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.lastName}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.email}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.phone}
                                                            </td>
                                                            <td scope="col" className="px-6 py-3 text-left w-32">
                                                                <button onClick={() => { addStudentToGroup(item._id) }}>
                                                                    <i className="fa-solid fa-square-plus"></i>
                                                                </button>
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
            </div>}
            {showS && <div className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>}
        </>
    )
}