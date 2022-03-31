// import React from 'react';
// import ReactDOM from 'react-dom';
import { sayHi } from "./components/hi/hi";
import { render } from "react-dom";
import App from "./components/App";


// const element = <h1>React Works!</h1>;

// ReactDOM.render(element, document.getElementById('root')); ||

render(<App/>, document.getElementById('root-react'));


sayHi();