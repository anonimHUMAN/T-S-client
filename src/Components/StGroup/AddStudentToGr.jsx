import { useRef, useState } from "react"
import Nav from "../Nav"
import axios from "axios"
import config from "../../config"
export default () => {
    let inp1 = useRef(null)
    let inp2 = useRef(null)
    let inp3 = useRef(null)

    const gcv = (inp) => {
        return inp.current.value
    }
    const checkInp = async () => {
        if (gcv(inp1) && gcv(inp2) && gcv(inp3)) {
            let user = {
                idTeacher: gcv(inp1),
                idGroup: gcv(inp2),
                idStudent: gcv(inp3),
            }
            let res = await axios.post(`${config.url}/students/manage`, user)
            inp1.current.value = ''
            inp2.current.value = ''
            inp3.current.value = ''
            alert("Student added to group successfully!!!")
        } else {
            alert("Enter all id...")
        }
    }
    return (
        <>
            <Nav />
            <div className="container pt-5 user-select-none">
                <div>
                    <a href="/delStudentFromGroup" className="btn btn-primary mb-3">Delete student to group</a>
                </div>
                <h1 className="mb-5">Add student to group</h1>
                <form className="row">
                    <div className="mb-3 col-6">
                        <label htmlFor="in1" className="form-label">idTeacher</label>
                        <input ref={inp1} type="text" className="form-control" id="in1" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in2" className="form-label">idGroup</label>
                        <input ref={inp2} type="text" className="form-control" id="in2" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in3" className="form-label">idStudent</label>
                        <input ref={inp3} type="text" className="form-control" id="in3" />
                    </div>

                    <button type="button" onClick={checkInp} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}