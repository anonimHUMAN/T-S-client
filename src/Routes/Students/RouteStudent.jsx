import { Route, Routes } from "react-router";
import Students from "../../Components/Students/Student";
function RouteStudents() {
    return (
        <>
            <Routes>
                <Route element={<Students />} path="/students"></Route>
            </Routes>
        </>
    )
}

export default RouteStudents