import { Route, Routes } from "react-router";
import AdminPanel from "../../Components/Admin/AdminPanel";
import AdminStudent from "../../Components/Admin/AdminStudent";
import AdminTeacher from "../../Components/Admin/AdminTeacher";
import AdminTeachGr from "../../Components/Admin/AdminTeacherGroups/AdminTeachGr";
import AdminTeach1Gr from "../../Components/Admin/AdminTeacherGroup/AdminTeach1Gr";
function RouteAdmin() {
    return (
        <>
            <Routes>
                <Route element={<AdminPanel />} path="/adminpanel"></Route>
                <Route element={<AdminStudent />} path="/adminstudent"></Route>
                <Route element={<AdminTeacher />} path="/adminteacher"></Route>
                <Route element={<AdminTeachGr />} path="/adminteachergroups"></Route>
                <Route element={<AdminTeach1Gr />} path="/adminteacheronegroup"></Route>
            </Routes>
        </>
    )
}

export default RouteAdmin