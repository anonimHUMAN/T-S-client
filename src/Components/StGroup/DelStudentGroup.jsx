import { useEffect, useRef, useState } from "react";
import Nav from "../Nav"
import config from "../../config";
export default () => {
    let [teachers, setTechers] = useState([])

    let inp1 = useRef(null)
    let inp2 = useRef(null)
    let inp3 = useRef(null)

    const gcv = (inp) => {
        return inp.current.value
    }

    function delStToGr() {
        if (gcv(inp1) && gcv(inp2) && gcv(inp3)) {
            fetch(`${config.url}/students/manage`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => setTechers(data.DATA))
            alert(`Student deleted from group successfully!!!`);
            inp1.current.value = ''
            inp2.current.value = ''
            inp3.current.value = ''
        } else {
            alert("Enter all id for delete student from group...")
        }
    }
    return (
        <>
            <Nav />
            <div className="container pt-5 user-select-none">
                <div>
                    <a href="/addStudentToGroup" className="btn btn-primary mb-3">Add student to group</a>
                </div>
                <h1 className="mb-5">Delete student from group</h1>
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

                    <button type="button" onClick={delStToGr} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}