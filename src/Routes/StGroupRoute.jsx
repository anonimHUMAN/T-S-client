import { Route, Routes } from "react-router";
import AddStudentToGr from "../Components/StGroup/AddStudentToGr";
import DelStudentGroup from "../Components/StGroup/DelStudentGroup";
function StGroupRoute() {
    return (
        <>
            <Routes>
                <Route element={<AddStudentToGr />} path="/addStudentToGroup"></Route>
                <Route element={<DelStudentGroup />} path="/delStudentFromGroup"></Route>
            </Routes>
        </>
    )
}

export default StGroupRoute