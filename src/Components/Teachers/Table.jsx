export default ({ data, th }) => {
    console.log(data, th);
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    {th.map((item, i) => {
                        return <th key={i} scope="col">{item}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map((item, i) => {
                    return (
                        <tr key={item._id}>
                            <th scope="row">{i + 1}</th>
                            <td>{item._id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.password}</td>
                            <td>{item.subject}</td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
}