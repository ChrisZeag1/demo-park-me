import React, { Component } from 'react';
import MainGrid  from './components/main-grid';

class App extends Component {
  render() {
    return (<div>
      <h1 class="Global text __ct">Select all the valid moves</h1>
      <MainGrid></MainGrid>
    </div>
     )
  }
}

export default App;
