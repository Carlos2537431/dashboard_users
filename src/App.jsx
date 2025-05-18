import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/peoples")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error ao  buscar usuarios:", err));
  }, []);

  return (
    <div className="App">
      <h1>Dashboard de Usuarios</h1>
      <p>Total de Usuarios: {users.length}</p>
      <div className="user-container">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
export default App;