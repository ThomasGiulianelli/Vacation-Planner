import * as React from 'react';
import './App.css';

import logo from './assets/backpack.gif';
import InteractiveWindow from './InteractiveWindow';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Vacation Planner</h1>
        </header>
        
          <InteractiveWindow />
        
      </div>
    );
  }
}

export default App;

