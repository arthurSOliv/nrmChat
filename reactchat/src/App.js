import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/Dashboard';
import ChatPage from './Pages/ChatroomPage';
import io from "socket.io-client";
import makeToast from "./Toaster";

function App() {
  const [socket, setSocket] = React.useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");
    if(token && !socket){
      const newSocket = io("http://localhost:3000", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("Error", "Socket Disconnected");
      });

      newSocket.on("connect", () => {
        makeToast("success", "Socket Connected");
      })

      setSocket(newSocket);
    }
  };

  React.useEffect(() => {
    setupSocket();
    // eslint-disable-next-line
  }, [])
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={IndexPage} exact />
        <Route
          path="/login"
          render={() => <LoginPage setupSocket={setupSocket} />}
          exact
        />
        <Route path="/register" component={RegisterPage} exact />
        <Route
          path="/dashboard"
          render={() => <DashboardPage socket={socket} />}
          exact
        />
        <Route
          path="/chat/:id"
          render={() => <ChatPage socket={socket} />}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
