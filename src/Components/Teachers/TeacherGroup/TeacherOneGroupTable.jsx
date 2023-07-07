import axios from "axios"
import { useEffect, useRef, useState } from "react"
import config from "../../../qwe/config"

export default ({ data, th }) => {
    const [backdrop, setBackdrop] = useState(false);
    let inp1 = useRef(null)
    let inp2 = useRef(null)
    let inp3 = useRef(null)
    let inp4 = useRef(null)
    let inp5 = useRef(null)
    let inp6 = useRef(null)
    let inp7 = useRef(null)
    const backdrop1 = () => { setBackdrop(!backdrop); };
    const getStId = (id) => { window.localStorage.setItem('StId', id) }
    const gcv = (inp) => { return inp.current.value }
    const addStudent = async () => {
        if (gcv(inp1) && gcv(inp2) && gcv(inp3) && gcv(inp4) && gcv(inp5) && gcv(inp6) && gcv(inp7)) {
            let data = {
                firstName: gcv(inp1),
                lastName: gcv(inp2),
                email: gcv(inp3),
                password: gcv(inp4),
                phone: gcv(inp5),
                ParentsPhoneNumber: {
                    mother: inp6.current.value,
                    father: inp7.current.value,
                }
            }
            let res = await axios.post(`${config.url}/teachers/crstudent`, data, {
                headers: {
                    authorization: window.localStorage.getItem("token")
                }
            })
            inp1.current.value = ''
            inp2.current.value = ''
            inp3.current.value = ''
            inp4.current.value = ''
            inp5.current.value = ''
            inp6.current.value = ''
            inp7.current.value = ''
            window.location.reload()
            let getId = await axios(`${config.url}/groups/getId`, {
                headers: {
                    authorization: window.localStorage.getItem("token")
                }
            })
            let data1 = {
                idTeacher: `${getId.data.id}`,
                idGroup: `${window.localStorage.getItem("grId")}`,
                idStudent: `${res.data.data._id}`
            }
            let res1 = await axios.post(`${config.url}/teachers/manage`, data1, {
                headers: {
                    authorization: window.localStorage.getItem("token")
                }
            })
            alert(res1.data.title)
        } else {
            alert("Complete all inputs...")
        }
    };
    const delStudent = async (id) => {
        let getId = await axios(`${config.url}/groups/getId`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        let res = await axios.delete(`${config.url}/teachers/manage?idTeacher=${getId.data.id}&idGroup=${window.localStorage.getItem("grId")}&idStudent=${id}`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        console.log(res);
        alert(res.data.title)
    };
    return (
        <>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        {th.map((item, i) => {
                            return <th key={i} scope="col">{item}</th>
                        })}
                        <th scope="col" className="px-6 py-3 text-right w-32">
                            <a href="/teacherattendance" className="mr-2 post-medium text-lg text-blue-600 dark:text-blue-500 hover:underline"><i className="fa-solid fa-list-check"></i></a>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left w-32">
                            <button onClick={backdrop1}>
                                <i className="fa-solid fa-square-plus"></i>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => {
                        return (
                            <tr key={i + 1} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-10 dark:text-white">
                                    {i + 1}
                                </th>
                                <td className="px-6 py-4">
                                    {item?.firstName} {item?.lastName}
                                </td>
                                <td className="px-6 py-4">
                                    {item?.attendance[0] == undefined && 0}
                                    {item?.attendance[0] !== undefined && item?.attendance.slice(-1).pop().score}
                                </td>
                                <td className="px-6 py-4">
                                    <a onClick={() => { getStId(item._id) }} href="/showattendance" className="mr-2 post-medium text-lg text-blue-600 dark:text-blue-500 hover:underline"><i className="fa-solid fa-check"></i></a>
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
            {backdrop && <div id="post-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex" aria-modal="true" role="dialog">
                <div className="relative w-10/12 max-h-full">
                    <div className="w-full relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={backdrop1} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="post-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="w-full px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Post</h3>

                            <label htmlFor="simple-search" className="sr-only">Ism</label>
                            <form className="flex items-center gap-16 mb-5">
                                <label htmlFor="simple-search" className="sr-only">Ism</label>
                                <div className="w-full">
                                    <input ref={inp1} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required="" />
                                </div>
                                <div className="w-full">
                                    <input ref={inp2} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required="" />
                                </div>
                                <div className="w-full">
                                    <input ref={inp3} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required="" />
                                </div>
                            </form>
                            <form className="flex items-center gap-16">
                                <div className="w-full">
                                    <input ref={inp4} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required="" />
                                </div>
                                <div className="w-full">
                                    <input ref={inp5} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone" required="" />
                                </div>
                                <div className="w-full">
                                    <input ref={inp6} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mother Phone" required="" />
                                </div>
                            </form>
                            <form className="mt-5 flex items-center gap-16">
                                <div className="w-full">
                                    <input ref={inp7} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Father Phone" required="" />
                                </div>
                            </form>
                            <div className="forBtn">
                                <button onClick={addStudent} type="button" id="simple-search" className="buttun">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {backdrop && <div modal-backdrop="" className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>}
        </>
    )
}