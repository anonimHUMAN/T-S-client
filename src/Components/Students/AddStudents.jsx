import { useEffect, useRef, useState } from "react"
import Nav from "../Nav"
import Alert from "../Alert"
import axios from "axios"
import config from "../../config"
export default () => {
    let inp1 = useRef(null)
    let inp2 = useRef(null)
    let inp3 = useRef(null)
    let inp4 = useRef(null)
    let inp5 = useRef(null)
    let inp6 = useRef(null)
    let inp7 = useRef(null)
    let inp8 = useRef(null)
    let inp9 = useRef(null)
    let inp10 = useRef(null)
    let inp11 = useRef(null)
    let inp12 = useRef(null)

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
        if (gcv(inp1) && gcv(inp2) && gcv(inp3) && gcv(inp4) && gcv(inp5) && gcv(inp6) && gcv(inp7) && gcv(inp8) && gcv(inp9) && gcv(inp10) && gcv(inp11) && gcv(inp12)) {
            let user = {
                firstName: gcv(inp1),
                lastName: gcv(inp2),
                email: gcv(inp3),
                phone: inp4.current.value,
                ParentsPhoneNumber: {
                    mother: gcv(inp5),
                    father: gcv(inp6),
                },
                password: gcv(inp7),
                totalScore: gcv(inp8),
                attendance: [
                    {
                        status: gcv(inp9),
                        time: gcv(inp10),
                        reason: gcv(inp11),
                        score: gcv(inp12)
                    }
                ]
            }
            let res = await axios.post(`${config.url}/students`, user)
            alert("Student added successfully!!!")
        } else {
            alert("Enter all information for student!!!")
        }
        inp1.current.value = ''
        inp2.current.value = ''
        inp3.current.value = ''
        inp4.current.value = ''
        inp5.current.value = ''
        inp6.current.value = ''
        inp7.current.value = ''
        inp8.current.value = ''
        inp9.current.value = ''
        inp10.current.value = ''
        inp11.current.value = ''
        inp12.current.value = ''
    }
    let [students, setStudents] = useState([])
    const fetchStudent = async () => {
        let res = await axios.get(`${config.url}/students`)
        setStudents(res.data.data);
    }
    useEffect(() => {
        // fetchStudent()
    }, [])
    return (
        <>
            <Nav />
            <div className="container pt-5 user-select-none">
                <h1 className="mb-5">Add student</h1>
                <form className="row">
                    <div className="mb-3 col-6">
                        <label htmlFor="in1" className="form-label">firstName</label>
                        <input ref={inp1} type="text" className="form-control" id="in1" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in2" className="form-label">lastName</label>
                        <input ref={inp2} type="text" className="form-control" id="in2" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in3" className="form-label">Email</label>
                        <input ref={inp3} type="email" className="form-control" id="in3" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in4" className="form-label">Phone</label>
                        <input ref={inp4} type="text" className="form-control" id="in4" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in5" className="form-label">Mother number</label>
                        <input ref={inp5} type="text" className="form-control" id="in5" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in5" className="form-label">Father number</label>
                        <input ref={inp6} type="text" className="form-control" id="in5" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in6" className="form-label">Password</label>
                        <input ref={inp7} type="password" autoComplete="on" className="form-control" id="in6" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in6" className="form-label">totalScore</label>
                        <input ref={inp8} type="number" autoComplete="on" className="form-control" id="in6" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in6" className="form-label">status</label>
                        <input ref={inp9} type="text" autoComplete="on" className="form-control" id="in6" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in6" className="form-label">time</label>
                        <input ref={inp10} type="number" autoComplete="on" className="form-control" id="in6" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in6" className="form-label">reason</label>
                        <input ref={inp11} type="text" autoComplete="on" className="form-control" id="in6" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in6" className="form-label">score</label>
                        <input ref={inp12} type="number" autoComplete="on" className="form-control" id="in6" />
                    </div>

                    <button type="button" onClick={checkInp} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}