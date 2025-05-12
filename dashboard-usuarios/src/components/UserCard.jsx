import './UserCard.css';
function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={`${user.firstName} avatar`}/>
      <h3>{user.firstName} {userlastName}</h3>
      <p>{user.email}</p>
      <small>{user.adress}</small>
    </div>
  );
}
export default UserCard;