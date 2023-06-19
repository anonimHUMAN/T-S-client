import RouteSignIn from "./Routes/RouteSignIn"
import RouteTrash from "./Routes/RouteTrash"
import RouteAdmin from "./Routes/Admin/RouteAdmin"
import RouteTeacher from "./Routes/Teachers/RouteTeacher"
import RouteStudents from "./Routes/Students/RouteStudent"

function App() {
  return (
    <>
      <RouteSignIn />
      <RouteTrash />
      <RouteAdmin />
      <RouteStudents />
      <RouteTeacher />
    </>
  )
}

export default App