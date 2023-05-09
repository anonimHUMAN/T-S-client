import { Route, Routes } from "react-router";
import Students from "../Components/Students/Students.jsx";
import AddStudents from "../Components/Students/AddStudents.jsx";
import DelStudents from "../Components/Students/DelStudents.jsx";
import EditStudents from "../Components/Students/EditStudents.jsx";
function Rstudent() {
    return (
        <>
            <Routes>
                <Route element={<Students />} path="/students"></Route>
                <Route element={<AddStudents />} path="/students/add"></Route>
                <Route element={<DelStudents />} path="/students/del"></Route>
                <Route element={<EditStudents />} path="/students/edit"></Route>
            </Routes>
        </>
    )
}

export default Rstudent