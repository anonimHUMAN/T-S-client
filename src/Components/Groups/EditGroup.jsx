import { useRef, useState } from "react"
import Nav from "../Nav"
// import Alert from "../Alert"
import axios from "axios"
import config from "../../config"
export default () => {
    let inpIdGroup = useRef(null)
    let inpIdTeacher = useRef(null)
    let inp1 = useRef(null)
    let inp2 = useRef(null)
    let inp3 = useRef(null)

    let [groups, setTeacher] = useState([])

    const fetchGroup = async () => {
        let res = await axios.get(`${config.url}/groups?idTeacher=${inpIdTeacher.current.value}`)
        setTeacher(res.data.data);
    }

    let [message, setMessage] = useState(true)

    const gcv = (inp) => {
        return inp.current.value
    }

    const getMessage = (text, color) => {
        setMessage(true)
        setTimeout(() => {
            setMessage(true)
        }, 2000)
        return (< Alert status={message} />)
    }

    const checkInp = async () => {
        if (inpIdGroup && inpIdTeacher && gcv(inp1) && gcv(inp2) && gcv(inp3)) {
            let user = {
                title: gcv(inp1),
                day: gcv(inp2),
                time: gcv(inp3),
            }
            let res = await axios.put(`${config.url}/groups/${inpIdGroup.current.value}?idTeacher=${inpIdTeacher.current.value}`, user)
            inpIdGroup.current.value = ''
            inpIdTeacher.current.value = ''
            inp1.current.value = ''
            inp2.current.value = ''
            inp3.current.value = ''
            alert("The teacher's group has been changed successfully...")
        } else {
            alert("Enter all information!!!")
        }
    }

    return (
        <>
            <Nav />
            <div className="container pt-5 user-select-none">
                <h1 className="mb-5">Edit teacher</h1>
                <form className="row">
                    <div className="mb-3 col-6">
                        <label htmlFor="inIdGr" className="form-label">Id Group</label>
                        <input ref={inpIdGroup} type="text" className="form-control" id="inIdGr" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="inIdTch" className="form-label">Id Teacher</label>
                        <input ref={inpIdTeacher} type="text" className="form-control" id="inIdTch" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in1" className="form-label">Title</label>
                        <input ref={inp1} type="text" className="form-control" id="in1" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in2" className="form-label">Day</label>
                        <input ref={inp2} type="text" className="form-control" id="in2" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in3" className="form-label">Time</label>
                        <input ref={inp3} type="text" className="form-control" id="in3" />
                    </div>

                    <button type="button" onClick={checkInp} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}