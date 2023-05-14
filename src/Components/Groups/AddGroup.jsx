import { useEffect, useRef, useState } from "react"
import Nav from "../Nav"
import axios from "axios"
import config from "../../config"
import Alert from "../Alert"
export default () => {
    let inp1 = useRef(null)
    let inp2 = useRef(null)
    let inp3 = useRef(null)
    let inp4 = useRef(null)


    let [message, setMessage] = useState(false)
    const gcv = (inp) => {
        return inp.current.value
    }
    const getMessage = () => {
        setMessage(true)
        setTimeout(() => {
            setMessage(false)
        }, 2000)
    }
    const checkInp = async () => {
        if (gcv(inp1) && gcv(inp2) && gcv(inp3) && gcv(inp4)) {
            let user = {
                title: gcv(inp2),
                day: gcv(inp3),
                time: gcv(inp4),
            }
            let res = await axios.post(`${config.url}/groups?idTeacher=${inp1.current.value}`, user)
            inp1.current.value = ''
            inp2.current.value = ''
            inp3.current.value = ''
            inp4.current.value = ''
            alert("Group added successfully!!!")
        } else {
            alert("Enter all information for group!!!")
        }
    }

    return (
        <>
            <Nav />

            <div className="container pt-5 user-select-none">
                <h1 className="mb-5">Add group</h1>
                <form className="row">
                    <div className="mb-3 col-6">
                        <label htmlFor="in1" className="form-label">Teacher id</label>
                        <input ref={inp1} type="text" className="form-control" id="in1" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in2" className="form-label">Title</label>
                        <input ref={inp2} type="text" className="form-control" id="in2" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in3" className="form-label">Day</label>
                        <input ref={inp3} type="text" className="form-control" id="in3" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in4" className="form-label">Time</label>
                        <input ref={inp4} type="text" className="form-control" id="in4" />
                    </div>

                    <button type="button" onClick={checkInp} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}