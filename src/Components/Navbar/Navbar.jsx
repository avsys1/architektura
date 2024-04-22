import Dropdown from "react-bootstrap/Dropdown";

const Navbar = ({ users, setActiveUser }) => {
  return (
    <nav>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Switch user
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {users.map((user) => (
            <Dropdown.Item onClick={() => setActiveUser(user)} key={user.id}>
              {user.firstname}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  );
};

export default Navbar;
