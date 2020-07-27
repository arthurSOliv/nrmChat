import React from "react";
import { withRouter } from "react-router-dom";
import makeToast from "../Toaster";

const ChatPage = ({ match, socket }) => {
  const chatroomId = match.params.id;
  const chatroomName = match.params.name;
  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();
  const [userId, setUserId] = React.useState("");

  const sendMessage = () => {
    const message = messageRef.current.value;
    if(message.startsWith("/stock=")){
      messageRef.current.value = "";
      return;
    }
    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId,
        message: messageRef.current.value,
      });

      messageRef.current.value = "";
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if(token){
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    if(socket){
      socket.on("newMessage", (message) => {
        const newMessages = [...messages, message];

        if(newMessages.length > 50){
          newMessages.shift();
        }

        setMessages(newMessages);
      });
    }
    // eslint-disable-next-line
  }, [messages]);

  React.useEffect(() => {

    if(socket){
      socket.emit("joinRoom", {
        chatroomId: chatroomId
      });

      socket.on("bot add", (message) => {
        makeToast("success", "Bot connected");
      });

      socket.on("newMessage", (message) => {
        setMessages([...messages, message]);
      });
    }

    return () => {
      if(socket){
        socket.emit("leaveRoom", {
          chatroomId: chatroomId
        });
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">{chatroomName}</div>
        <div className="chatroomContent">
          {messages.map((message, i) => (
            <div key={i} className="message">
              <span className={
                  userId === message.userId ? "ownMessage" : "otherMessage"
                }>{message.username} </span> {message.message}
            </div>
          ))}
        </div>
        <div className="chatroomActions">
          <div>
            <input type="text" name="message" placeholder="Type something" ref={messageRef} />
          </div>
          <div>
            <button className="join" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ChatPage);
