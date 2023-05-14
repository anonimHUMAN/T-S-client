import Nav from "./Nav"

export default () => {
    return (
        <>
            <Nav />
            <div className="container user-select-none">
                <h1>Home</h1>
            </div>
            <div className="container pt-5 text-center text-danger user-select-none">
                <a className="text-white text-decoration-none" href="/teachers">About teachers</a><br /><hr />
                <a className="text-white text-decoration-none" href="/students">About students</a><br /><hr />
                <a className="text-white text-decoration-none" href="/groups">Teacher groups</a><hr />
            </div >
        </>
    )
}