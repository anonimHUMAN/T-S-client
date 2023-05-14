import { Route, Routes } from "react-router";
import Teachers from "../Components/Teachers/Teachers.jsx"
import AddTeachers from "../Components/Teachers/AddTeachers.jsx";
import DelTeacher from "../Components/Teachers/DelTeacher.jsx";
import EditTeacher from "../Components/Teachers/EditTeacher.jsx";
function Rteacher() {
    return (
        <>
            <Routes>
                <Route element={<Teachers />} path="/teachers"></Route>
                <Route element={<AddTeachers />} path="/teachers/add"></Route>
                <Route element={<DelTeacher />} path="/teachers/del"></Route>
                <Route element={<EditTeacher />} path="/teachers/edit"></Route>
            </Routes>
        </>
    )
}

export default Rteacher