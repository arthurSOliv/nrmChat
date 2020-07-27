import React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import makeToast from "../Toaster";

const DashboardPage = (props) => {
  const nameRef = React.createRef();
  const [chats, setChats] = React.useState([]);

  const registerChat = () => {
    const name = nameRef.current.value;

    axios.post("http://localhost:3333/chatroom", {
      name,
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("CC_Token"),
      },
    }).then(response => {
      console.log(response.data);
      nameRef.current.value = "";
      getChats();
      makeToast("success", response.data.message);
    }).catch(err => {
      if(
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      )
      makeToast("error", err.response.data.message);
    });
  }

  const getChats = () => {
    axios.get("http://localhost:3333/chatroom", {
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
          <input type="text" name="chatName" id="chatName" placeholder="Type the name of the chat." ref={nameRef} />
        </div>
        <button onClick={registerChat}>Create</button>
        <div className="chatrooms">
          {chats.map(chat => (
            <div key={chat._id} className="chatroom">
              <div>{chat.name}</div>
              <Link to={"/chat/" + chat._id + '/'  + chat.name}>
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
