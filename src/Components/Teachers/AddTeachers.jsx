import { useEffect, useRef, useState } from "react"
import Nav from "../Nav"
import axios from "axios"
import config from "../../config"
import Alert from "../Alert"
export default () => {
    let test = 2
    let inp1 = useRef(null)
    let inp2 = useRef(null)
    let inp3 = useRef(null)
    let inp4 = useRef(null)
    let inp5 = useRef(null)
    let inp6 = useRef(null)
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
        if (gcv(inp1) && gcv(inp2) && gcv(inp3) && gcv(inp4) && gcv(inp5) && gcv(inp6)) {
            let user = {
                firstName: gcv(inp1),
                lastName: gcv(inp2),
                email: gcv(inp3),
                phone: inp4.current.value,
                password: gcv(inp6),
                subject: gcv(inp5)
            }
            let res = await axios.post(`${config.url}/teachers`, user)
            inp1.current.value = ''
            inp2.current.value = ''
            inp3.current.value = ''
            inp4.current.value = ''
            inp5.current.value = ''
            inp6.current.value = ''
            // alert("Successed!!!")
            getMessage("Successed!!!")
            test = 1
        } else {
            getMessage("Enter all data!!!")
            test = 2
        }
        // console.log(test);
    }
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
            {message ? <Alert text={test} /> : false}
            <div className="container pt-5">
                <h1 className="mb-5">Add teacher</h1>
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
                        <label htmlFor="in5" className="form-label">Subject</label>
                        <input ref={inp5} type="text" className="form-control" id="in5" />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="in6" className="form-label">Password</label>
                        <input ref={inp6} type="password" autoComplete="on" className="form-control" id="in6" />
                    </div>
                    <button type="button" onClick={checkInp} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}