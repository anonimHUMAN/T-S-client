import { useRef, useState } from "react";
import config from "../../../qwe/config"
import axios from "axios";

export default ({ data1, th }) => {
    const itemsRef = useRef([]);
    const itemsRef1 = useRef([]);

    const addAttendance = async () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        let data = []
        for (let i = 0; i < data1.length; i++) {
            let status = '-'
            let time = date + '/' + month + '/' + year
            let reason = itemsRef.current[i].checked
            let score = 0
            if (itemsRef.current[i].checked === true) {
                score = itemsRef1.current[i].value === '' ? 1 : itemsRef1.current[i].value
            }
            if (itemsRef.current[i].checked === true) {
                status = "+"
            }
            let newData = {
                _id: data1[i]._id,
                status: status,
                time: time,
                reson: reason,
                score: score
            }
            data.push(newData)
        }
        let res = await axios.post(`${config.url}/routeTeacher/attend`, { data: data }, {
            headers: {
                authorization: window.localStorage.getItem("token")
            }
        })
        console.log(res);
        alert(res.data.message)
        window.location.reload()
    }
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
                    </tr>
                </thead>
                <tbody>
                    {data1.map((item, i) => {
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
                                    {item.attendance[0] == undefined && 0}
                                    {item.attendance[0] !== undefined && item.attendance.slice(-1).pop().score}
                                </td>
                                <td className="tab w-full px-6 py-4 text-right w-32 flex gap-12 items-center">
                                    <input ref={el => itemsRef.current[i] = el} type="checkbox" className="bg-gray-200 dark:bg-gray-700" />
                                    <input ref={el => itemsRef1.current[i] = el} type="number" inputMode="numeric" className="inp text-gray-900 w-14 h-8 bg-gray-200 dark:bg-gray-700 dark:text-gray-200" />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="forBtn">
                <button onClick={addAttendance} type="button" id="simple-search" className="buttun">Submit</button>
            </div>
        </>
    )
}