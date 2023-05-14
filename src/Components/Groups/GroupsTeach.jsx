import { useEffect, useRef, useState } from "react"
import Nav from "../Nav"
import axios from "axios"
import config from "../../config"
import Table2 from "./Table2"
export default ({ data }) => {
    let inp1 = useRef(null)
    let [groups, setGroups] = useState([])
    let [inpT1, setInpT1] = useState([])
    const fetchGroup = async () => {
        let res = await axios.get(`${config.url}/groups?idTeacher=${inp1.current.value}`)
        setGroups(res.data.data.group);
        inpT1.push(inp1.current.value)
    }
    const checkInp = () => {
        if (inp1.current.value) {
            fetchGroup()
        } else {
            alert("Something ERROR: ")
        }
    }
    return (
        <>
            <Nav />
            <div className="container pt-5 user-select-none">
                <div>
                    <a href="/groups/add" className="btn btn-primary mb-3">Add group</a>
                    <a href="/groups/del" className="btn btn-primary mb-3 ms-5">Delete group</a>
                    <a href="/groups/edit" className="btn btn-primary mb-3 ms-5">Edit group</a>
                </div>
                <h1>All groups</h1>
                <form className="row mb-3">
                    <div className="col-6">
                        <label htmlFor="in1" className="form-label">Teacher id</label>
                        <input ref={inp1} type="text" className="form-control" id="in1" />
                    </div>
                    <button type="button" onClick={checkInp} className="btn btn-primary mt-4 col-6 p-1">Submit</button>
                </form>
                <Table2 data={groups} th={["id", "title", "day", "time", "delete", "edit", "students"]} inpT1={inpT1} />
            </div>
        </>
    )
}