import { Route, Routes } from "react-router";
import Trash from "../Components/Auth/Trash";
function RouteTrash() {
    return (
        <>
            <Routes>
                <Route element={<Trash />} path="/trash"></Route>
            </Routes>
        </>
    )
}

export default RouteTrash