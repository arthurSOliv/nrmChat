import React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [chats, setChats] = React.useState([]);

  const getChats = () => {
    axios.get("http://localhost:3000/chatroom", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("CC_Token"),
      },
    }).then((response) => {
      setChats(response.data);
    }).catch(err => {
      setTimeout(getChats, 3000);
    });
  };

  React.useEffect(() => {
    getChats();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card">
      <div className="cardHeader">
        Chats
      </div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatName">Name</label>
          <input type="text" name="chatName" id="chatName" placeholder="Type the name of the chat." />
        </div>
        <button>Create</button>
        <div className="chatrooms">
          {chats.map(chat => (
            <div key={chat._id} className="chatroom">
              <div>{chat.name}</div>
              <Link to={"/chat/" + chat._id}>
                <div className="join">Join</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
