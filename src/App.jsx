import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
  const usersPerPage = 5; // Número de usuários por página

  useEffect(() => {
    fetch("http://localhost:3001/peoples")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error ao buscar usuarios:", err));
  }, []);

  // Calcular os índices dos usuários a serem exibidos
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Funções para mudar de página
  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Dashboard de Usuarios</h1>
      <p>Total de Usuarios: {users.length}</p>
      <div className="user-container">
        {currentUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(users.length / usersPerPage)}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export default App;