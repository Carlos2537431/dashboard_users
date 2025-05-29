import './UserCard.css';

function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={`${user.firstName} avatar`}/>
      <h3>{user.firstName} {user.lastName}</h3>
      <p>{user.email}</p>
      <small>{user.address}</small>
    </div>
  );
}
// UserCard é um componente que recebe um objeto de usuário e exibe suas informações em um cartão estilizado.

export default UserCard;