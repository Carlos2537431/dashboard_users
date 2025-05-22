import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null); // Estado para o usuário selecionado
  const usersPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:3001/peoples")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error ao buscar usuarios:", err));
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

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

  const handleUserClick = (user) => {
    setSelectedUser(user); // Define o usuário selecionado
  };

  const handleBack = () => {
    setSelectedUser(null); // Volta para a lista de usuários
  };

  return (
    <div className="App">
      <h1>Dashboard de Usuarios</h1>
      {selectedUser ? (
        <div className="user-details">
          <button onClick={handleBack}>Voltar</button>
          <h2>Detalhes do Usuário</h2>
          <img src={selectedUser.avatar} alt={`${selectedUser.firstName} avatar`} />
          <h3>{selectedUser.firstName} {selectedUser.lastName}</h3>
          <p>Email: {selectedUser.email}</p>
          <p>Endereço: {selectedUser.address}</p>
        </div>
      ) : (
        <>
          <p>Total de Usuarios: {users.length}</p>
          <div className="user-container">
            {currentUsers.map((user) => (
              <div key={user.id} onClick={() => handleUserClick(user)}>
                <UserCard user={user} />
              </div>
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
        </>
      )}
    </div>
  );
}

export default App;