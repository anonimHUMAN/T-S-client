import { Route, Routes } from "react-router";
import Teachers from "../../Components/Teachers/Teacher";
import TeacherAttendance from "../../Components/Teachers/Attendance/TeacherAttendance";
import TeacherGroups from "../../Components/Teachers/TeacherGroups/TeacherGroups";
import TeacherOneGroup from "../../Components/Teachers/TeacherGroup/TeacherOneGroup";
import TeacherStudents from "../../Components/Teachers/TeacherStudents";
import ShowAttendance777 from "../../Components/Teachers/ShowAttend/ShowAttendance777";

function RouteTeacher() {
    return (
        <>
            <Routes>
                <Route element={<Teachers />} path="/teachers"></Route>
                <Route element={<TeacherAttendance />} path="/teacherattendance"></Route>
                <Route element={<TeacherGroups />} path="/teachergroups"></Route>
                <Route element={<TeacherOneGroup />} path="/teacheronegroup"></Route>
                <Route element={<TeacherStudents />} path="/teacherstudents"></Route>
                <Route element={<ShowAttendance777 />} path="/showattendance"></Route>
            </Routes>
        </>
    )
}

export default RouteTeacher