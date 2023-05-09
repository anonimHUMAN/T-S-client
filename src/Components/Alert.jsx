export default ({ text }) => {
    // console.log(text);
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
    let tTest = ""
    console.log();
    if (text == 1) {
        tTest = "Success..."
    } else if (text == 2) {
        tTest = "Enter all data!!!"
    } else {
        tTest = "Something wrong..."
    }
    return (
        <div className="alert alert-primary active" style={{ ...style, ...active }} role="alert">
            {/* {text} */}
            {tTest}
        </div>
    )
}