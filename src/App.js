import React from "react";
import UserProvider from "./context/UserContext";
import MainContainer from "./componets/MainContainer";

function App() {
  return (
    <>
      <UserProvider>
        <div className="titulo">
          <h1>Wispro</h1>
        </div>
        <MainContainer />
      </UserProvider>
    </>
  );
}

export default App;
