import React, { useState } from "react";

import "./global.css";

// import Header from "./Header";
// import Logon from "./pages/Logon";
import Routes from "./routes";

//Um componente no React é uma function que retorna HTML

function App() {
  const [counter, setCounter] = useState(0);
  //UseState retorna um array de 2 posições [valor, funcaoDeAtualizacao]

  // function increment() {
  //   setCounter(counter + 1);
  // }

  return (
    <div>
      <Routes />
      {/* <Header>Contador: {counter}</Header>
      <button onClick={increment}>Incrementar</button> */}
    </div>
  );
  // return <h1>Hello World</h1>;
}

export default App;
