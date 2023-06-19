export default ({ data, th }) => {
    return (
        <>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-400 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        {th.map((item, i) => {
                            return <th key={i} scope="col">{item}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => {
                        return (
                            <tr key={item._id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-10 dark:text-white">
                                    {i + 1}
                                </th>
                                <td className="px-6 py-4">
                                    {item.firstName}<span> </span>{item.lastName}
                                </td>
                                <td className="px-6 py-4">
                                    {item.attendance[0] == undefined && 0}
                                    {item.attendance[0] !== undefined && item.attendance.slice(-1).pop().score}
                                </td>
                                <td className="tab w-full px-6 py-4 text-right w-32 flex gap-12 items-center">
                                    <input type="checkbox" className="bg-gray-200 dark:bg-gray-700" />
                                    <input type="number" inputMode="numeric" className="inp text-gray-900 w-14 h-8 bg-gray-200 dark:bg-gray-700 dark:text-gray-200" />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}