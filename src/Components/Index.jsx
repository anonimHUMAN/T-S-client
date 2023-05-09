import Nav from "./Nav"

export default () => {
    return (
        <>
            <Nav />
            <div className="container">
                <h1>Home</h1>
                <a href="/teachers">About teachers</a><br />
                <a href="/students">About students</a>
            </div>
        </>
    )
}