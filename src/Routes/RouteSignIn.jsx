import { Route, Routes } from "react-router";
import SignIn from "../Components/Auth/SignIn";
function RouteSignIn() {
    return (
        <>
            <Routes>
                <Route element={<SignIn />} path="/"></Route>
            </Routes>
        </>
    )
}

export default RouteSignIn