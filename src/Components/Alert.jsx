export default () => {
    const style = {
        position: "absolute",
        top: "60px",
        right: "-10%",
        paddingRight: "100px",
        transition: ".5s",
        color: "red"
    }
    const active = {
        right: (status ? "5px" : "0%")
    }
    return (
        <div className="alert alert-primary active" style={{ ...style, ...active }} role="alert">
            Enter all data for teacher!!!
        </div>
    )
}