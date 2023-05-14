import { Route, Routes } from "react-router";
import GroupsTeach from "../Components/Groups/GroupsTeach";
import AddGroup from "../Components/Groups/AddGroup";
import DelGroup from "../Components/Groups/DelGroup";
import EditGroup from "../Components/Groups/EditGroup";
function RGroup() {
    return (
        <>
            <Routes>
                <Route element={<GroupsTeach />} path="/groups"></Route >
                <Route element={<AddGroup />} path="/groups/add"></Route >
                <Route element={<DelGroup />} path="/groups/del"></Route >
                <Route element={<EditGroup />} path="/groups/edit"></Route>
            </Routes>
        </>
    )
}

export default RGroup