import React, { useEffect, useState } from "react";


const UsersPage = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(1);
 
    const fetchUsers = async () => {
        setLoading(true)

        await fetch('http://localhost:5000/users')
        .then(response => {
            if (!response.ok){
                throw new Error("Error fetching users");
            }
            return response.json();
        })
        .then(data => {
            setUsers(data)
        })

        setLoading(false);

    };

    useEffect(() => {
        fetchUsers();
      }, []);

    return (
      <main>
        <h1>Users in the database:</h1>
        {
            loading ? (
                <div>
                    <div className="spinner-border text-primary" role="status" />
                </div>
            ) : (
                users.map((user) => (
                    <div key={user._id}>
                        <p>{user.name} - {user.telefone} </p>
                    </div>
                ))
            )
        
        }
      </main>
    );
  }


export default UsersPage;