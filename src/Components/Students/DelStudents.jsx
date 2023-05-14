import { useEffect, useRef, useState } from "react";
import Nav from "../Nav"
import config from "../../config";
export default () => {
    let [students, setStudents] = useState([])

    let inp1 = useRef(null)

    function delStudent() {
        if (inp1.current.value) {
            fetch(`${config.url}/students/${inp1.current.value}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => setStudents(data.DATA))
            alert(`Student deleted successfully!!!`);
            inp1.current.value = ''
        } else {
            alert("Enter id for student!!!")
        }
    }
    return (
        <>
            <Nav />
            <div className="container pt-5 user-select-none">
                <h1 className="mb-5">Delete student</h1>
                <form className="row">
                    <div className="col-6">
                        <label htmlFor="in1" className="form-label">Id</label>
                        <input ref={inp1} type="text" className="form-control" id="in1" />
                    </div>
                    <button type="button" onClick={delStudent} className="btn btn-primary mt-4 col-6 p-1">Submit</button>
                </form>
            </div>
        </>
    )
}