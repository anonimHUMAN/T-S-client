import { useEffect, useState } from "react"
import Nav from "../Nav"
import Table from "./Table"
import axios from "axios"
import config from "../../config"
export default () => {
    let [teachers, setTechers] = useState([])
    const fetchTecher = async () => {
        let res = await axios.get(`${config.url}/teachers`)
        setTechers(res.data.data);
    }
    useEffect(() => {
        fetchTecher()
    }, [])
    return (
        <>
            <Nav />
            <div className="container pt-5 user-select-none">
                <div>
                    <a href="/teachers/add" className="btn btn-primary mb-3">Add  teacher</a>
                    <a href="/teachers/del" className="btn btn-primary mb-3 ms-5">Delete  teacher</a>
                    <a href="/teachers/edit" className="btn btn-primary mb-3 ms-5">Edit  teacher</a>
                </div>
                <h1>All teacher</h1>
                <Table data={teachers} th={["id", "firstName", "lastName", "email", "phone", "password", "subject"]} />
            </div>
        </>
    )
}