import { useEffect, useRef, useState } from "react";
import Nav from "../Nav"
import config from "../../config";
export default () => {
    let [groups, setGroups] = useState([])

    let inp1 = useRef(null)
    let inp2 = useRef(null)

    function delGroup() {
        if (inp1.current.value && inp2.current.value) {
            fetch(`${config.url}/groups?idTeacher=${inp1.current.value}&idGroup=${inp2.current.value}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => setGroups(data.DATA))
            inp1.current.value = ''
            inp2.current.value = ''
            alert(`The teacher's group was successfully deleted...`);
        } else {
            alert("Complete all input!!!")
        }
    }
    return (
        <>
            <Nav />
            <div className="container pt-5 user-select-none">
                <h1 className="mb-5">Delete group</h1>
                <form className="row">
                    <div className="col-6">
                        <label htmlFor="in1" className="form-label">Id for teacher</label>
                        <input ref={inp1} type="text" className="form-control" id="in1" />
                    </div>
                    <div className="col-6">
                        <label htmlFor="in2" className="form-label">Id for group</label>
                        <input ref={inp2} type="text" className="form-control" id="in2" />
                    </div>
                    <button type="button" onClick={delGroup} className="btn btn-primary mt-4 col-12 p-2">Submit</button>
                </form>
            </div>
        </>
    )
}