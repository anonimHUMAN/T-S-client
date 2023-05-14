import { Route, Routes } from "react-router";
import Index from "./Components/Index.jsx"
import Rteacher from "./Routes/RouteTeacher.jsx";
import Rstudent from "./Routes/RouteStudents.jsx";
import RGroup from "./Routes/RouteGroup.jsx";
import StGroupRoute from "./Routes/StGroupRoute.jsx";
function App() {
    return (
        <>
            <Rteacher />
            <Rstudent />
            <RGroup />
            <StGroupRoute />
            <Routes>
                <Route element={<Index />} path="/"></Route>
            </Routes>
        </>
    )
}

export default App
