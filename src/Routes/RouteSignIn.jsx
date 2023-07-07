import { Route, Routes } from "react-router";
import SignIn from "../Components/Auth/SignIn";
import Animation from "../Components/Auth/animation";
function RouteSignIn() {
    return (
        <>
            <Routes>
                <Route element={<Animation />} path="/"></Route>
                <Route element={<SignIn />} path="/login"></Route>
            </Routes>
        </>
    )
}

export default RouteSignIn