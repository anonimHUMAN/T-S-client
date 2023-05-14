import { useRef, useState } from "react";
import config from "../../config";
import axios from "axios"
export default ({ data, th, inpT1 }) => {
    // console.log(inpT1[0]);
    let inp2 = useRef(null)
    let inp3 = useRef(null)
    let inp4 = useRef(null)
    let [groups, setGroups] = useState([])
    const gcv = (inp) => {
        return inp.current.value
    }

    const icon = (item) => {
        { navigator.clipboard.writeText(item) }
        alert(`This ${item} copied!!!`)
    }

    function delGroup(item) {
        console.log(item);
        console.log(inpT1[0]);
        if (item && inpT1[0]) {
            fetch(`${config.url}/groups?idTeacher=${inpT1}&idGroup=${item}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => setGroups(data.DATA))
            alert(`The teacher's group was successfully deleted...`);
        } else {
            alert("Complete all input!!!")
        }
    }

    const editGroup = async (item) => {
        if (gcv(inp2) && gcv(inp3) && gcv(inp4)) {
            let user = {
                title: gcv(inp2),
                day: gcv(inp3),
                time: gcv(inp4),
            }
            let res = await axios.put(`${config.url}/groups/${item}?idTeacher=${inpT1}`, user)
            inp2.current.value = ''
            inp3.current.value = ''
            inp4.current.value = ''
            alert("The teacher's group has been changed successfully...")
        } else {
            alert("Enter all information!!!")
        }
    }

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        {th.map((item, i) => {
                            return <th key={i} scope="col">{item}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => {
                        return (
                            <tr key={item._id}>
                                <th scope="row">{i + 1}</th>
                                <td onClick={() => { icon(item._id) }}><ion-icon name="copy-outline"></ion-icon></td>
                                <td>{item.title}</td>
                                <td>{item.day}</td>
                                <td>{item.time}</td>
                                <td onClick={() => { delGroup(item._id) }}><ion-icon name="trash-outline"></ion-icon></td>
                                <td onClick={() => { editGroup(item._id) }}><ion-icon name="create-outline"></ion-icon></td>
                                <td>{item.students.length}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="card mt-2 mb-2 d-block">
                <div className="card-body">
                    <form className="row mb-3">
                        <div className="col-4">
                            <label htmlFor="in1" className="form-label">Title</label>
                            <input ref={inp2} type="text" className="form-control" id="in1" />
                        </div>
                        <div className="col-4">
                            <label htmlFor="in2" className="form-label">Day</label>
                            <input ref={inp3} type="text" className="form-control" id="in2" />
                        </div>
                        <div className="col-4">
                            <label htmlFor="in3" className="form-label">Time</label>
                            <input ref={inp4} type="text" className="form-control" id="in3" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}