import React, { Component } from 'react';
import MainGrid  from './main-grid';

class Manouvers  extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <h1 class="Global text __ct">Select all the valid moves</h1>
      <MainGrid></MainGrid>
    </div>)
  }
}

export default Manouvers;