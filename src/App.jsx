import { Route, Routes } from "react-router";
import Index from "./Components/Index.jsx"
import Rteacher from "./Routes/RouteTeacher.jsx";
import Rstudent from "./Routes/RouteStudents.jsx";
function App() {
    return (
        <>
            <Rteacher />
            <Rstudent />
            <Routes>
                <Route element={<Index />} path="/"></Route>
            </Routes>
        </>
    )
}

export default App
