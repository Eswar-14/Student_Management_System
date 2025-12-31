const ListStudentComponent = () => {
    const dummyData = [
        { id: 1, name: "Jagadish", email: "jagadish@test.com", department: "Engineering" },
        { id: 2, name: "Eswar", email: "eswar@test.com", department: "Architecture" }
    ];

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Student Records</h2>
            <div className="card shadow">
                <div className="card-body">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyData.map(student => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.department}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ListStudentComponent