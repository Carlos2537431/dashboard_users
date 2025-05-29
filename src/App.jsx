import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import "./App.css";
//importa biblioteca useEffect e useState do React, e o componente UserCard e o arquivo de estilos App.css
function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null); 
  const usersPerPage = 5;
  //cria as constantes da função App

  useEffect(() => {
    fetch("http://localhost:3001/peoples")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error ao buscar usuarios:", err));
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
// calcula o índice do último usuário e o índice do primeiro usuário com base na página atual e no número de usuários por página, e obtém os usuários atuais para exibição.
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
// Define as funções para avançar e retroceder páginas, garantindo que não ultrapasse os limites da lista de usuários.
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
        // Exibe os detalhes do usuário selecionado, incluindo um botão para voltar à lista de usuários.
      ) : (
        <>
          <p>Total de Usuarios: {users.length}</p>
          <div className="user-container">
            {currentUsers.map((user) => (
              <div key={user.id} onClick={() => handleUserClick(user)}>
                <UserCard user={user} />
              </div> 
 // Renderiza os cartões de usuário, permitindo que o usuário clique em um cartão para ver mais detalhes.
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
        // Renderiza a lista de usuários com paginação, incluindo botões para navegar entre as páginas.
      )}
    </div>
  );
}

export default App;