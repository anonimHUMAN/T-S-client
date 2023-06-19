import axios from "axios";
import { useRef, useState } from "react";
import config from "../../../qwe/config";

export default ({ data, th }) => {
    const [edit, setEdit] = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [groupId, setGroupId] = useState('');

    const backdrop1 = () => { setBackdrop(!backdrop); };
    const edit1 = () => { setEdit(!edit); };
    const getId = (id, title) => {
        window.localStorage.setItem('grId', id)
        window.localStorage.setItem('title', title)
    };

    let inp1 = useRef(null)
    let inp2 = useRef(null)
    let inp3 = useRef(null)

    const gcv = (inp) => { return inp.current.value }
    const getGrId = (id) => { setGroupId(id) };

    const editGroup = async () => {
        if (gcv(inp1) && gcv(inp2) && gcv(inp3)) {
            let groupEd = {
                title: gcv(inp1),
                day: gcv(inp2),
                time: gcv(inp3)
            }
            let res = await axios.put(`${config.url}/groups/${groupId}?idTeacher=${window.localStorage.getItem('teacherId')}`, groupEd, {
                headers: {
                    authorization: window.localStorage.getItem("token")
                }
            })
            if (res.data.title === "Group updated") {
                alert(res.data.title)
            }
            inp1.current.value = ''
            inp2.current.value = ''
            inp3.current.value = ''
            window.location.reload()
        } else {
            alert("Complete all input...")
        }
    };
    const delStudent = async (id) => {
        let res = await axios.delete(`${config.url}/groups?idTeacher=${window.localStorage.getItem('teacherId')}&idGroup=${id}`, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        if (res.data.title === "Group deleted") {
            alert(res.data.title)
        }
        window.location.reload()
    };
    const addGroup = async () => {
        if (gcv(inp1) && gcv(inp2) && gcv(inp3)) {
            let addGr = {
                title: gcv(inp1),
                day: gcv(inp2),
                time: gcv(inp3)
            }
            let res = await axios.post(`${config.url}/groups?idTeacher=${window.localStorage.getItem('teacherId')}`, addGr, {
                headers: {
                    authorization: window.localStorage.getItem("token")
                }
            })
            if (res.data.title === "Group added to teacher") {
                alert(res.data.title)
            }
            inp1.current.value = ''
            inp2.current.value = ''
            inp3.current.value = ''
            window.location.reload()
        } else {
            alert("Complete all input...")
        }
    };
    return (
        <>
            <table className="table w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 text-gray-400 uppercase bg-gray-200 dark:bg-gray-700 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        {th.map((item, i) => {
                            return <th key={i} scope="col">{item}</th>
                        })}
                        <th scope="col" className="px-6 py-3 text-right w-32">
                            <a onClick={backdrop1} data-modal-target="post-modal" data-modal-toggle="post-modal" href="#" className="post-medium text-lg text-blue-600 dark:text-blue-500 hover:underline"><i
                                className="fa-solid fa-square-plus"></i></a>
                            <span className="sr-only">Close modal</span>
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
                                    <a onClick={() => { getId(item._id, item.title) }} href="/adminteacheronegroup">{item.title}</a>
                                </td>
                                <td className="px-6 py-4">
                                    {item.day}
                                </td>
                                <td className="px-6 py-4">
                                    {item.time}
                                </td>
                                <td className="px-6 py-4">
                                    {item.students.length}
                                </td>
                                <td className="px-6 py-4 text-right w-32">
                                    <a onClick={edit1} onClickCapture={() => { getGrId(item._id) }} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                                        href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        <i className="fa-solid fa-pen"></i>
                                    </a>
                                    <a onClick={() => { delStudent(item._id, item.title) }} href="#" className="ml-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        <i className="fa-solid fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {edit && <div id="authentication-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex" aria-modal="true" role="dialog">
                <div className="relative w-10/12 max-h-full">
                    <div className="w-full relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={edit1} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="w-full px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit</h3>
                            <form className="flex items-center gap-16 mb-5">
                                <label htmlFor="simple-search" className="sr-only">Ism</label>
                                <div className="w-full">
                                    <input ref={inp1} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required="" />
                                </div>
                                <div className="w-full">
                                    <input ref={inp2} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Day" required="" />
                                </div>
                                <div className="w-full">
                                    <input ref={inp3} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Time" required="" />
                                </div>
                            </form>
                            <div className="forBtn">
                                <button onClick={editGroup} type="button" id="simple-search" className="buttun">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {edit && <div className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>}
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
                                    <input ref={inp1} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required="" />
                                </div>
                                <div className="w-full">
                                    <input ref={inp2} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Day" required="" />
                                </div>
                                <div className="w-full">
                                    <input ref={inp3} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Time" required="" />
                                </div>
                            </form>
                            <div className="forBtn">
                                <button onClick={addGroup} type="button" id="simple-search" className="buttun">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {backdrop && <div modal-backdrop="" className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>}
        </>
    )
}