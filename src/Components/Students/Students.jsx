import { useEffect, useState } from "react"
import Nav from "../Nav"
import TableS from "./TableS"
import axios from "axios"
import config from "../../config"
export default () => {
    let [students, setStudents] = useState([])
    const fetchTecher = async () => {
        let res = await axios.get(`${config.url}/students`)
        setStudents(res.data.data);
    }
    useEffect(() => {
        fetchTecher()
    }, [])
    return (
        <>
            <Nav />
            <div className="container pt-5">
                <div>
                    <a href="/students/add" className="btn btn-primary mb-3">Add  student</a>
                    <a href="/students/del" className="btn btn-primary mb-3 ms-5">Delete  student</a>
                    <a href="/students/edit" className="btn btn-primary mb-3 ms-5">Edit  student</a>
                </div>
                <h1>All student</h1>
                <TableS data={students} th={["id", "firstName", "lastName", "email", "phone", "mother", "father", "password", "totalscore"]} />
            </div>
        </>
    )
}