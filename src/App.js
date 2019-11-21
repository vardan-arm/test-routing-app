import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = () => (
  <div>
    Home
  </div>
);

const About = () => (
  <div>
    About
  </div>
);

const Code = () => (
  <div>
    Code
  </div>
);

const Contact = () => (
  <div>
    Contact
  </div>
);

const Info = () => (
  <div>
    Info
  </div>
);

const MainMenu = () => {
return (
  <div>
    <Link to="/">
      <button>home</button>
    </Link>
    <Link to="/about">
      <button>About</button>
    </Link>
    <Link to="/code">
      <button>code</button>
    </Link>
    <Link to="/contact">
      <button>contact</button>
    </Link>
    <Link to="/info">
      <button>info</button>
    </Link>
  </div>
);
};


function App() {
  return (
    <Router basename={ process.env.PUBLIC_URL }>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <MainMenu />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/code" component={Code} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/info" component={Info} />
    </div>
    </Router>
  );
}

export default App;
