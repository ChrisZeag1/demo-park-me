import React, { Component } from 'react';
import  Manouvers  from './manouvers';

let ValidView = true;

function ToggleViews()  {
  if (ValidView) {
    return <Manouvers type={'valid'}></Manouvers>
  }
  return <Manouvers type={'invalid'}></Manouvers>
}

class ValidInvalid extends Component {
  toggleValid(e) {
    e.preventDefault();
    ValidView = !ValidView;
    this.forceUpdate();
  }
  render() {
    return (<span> 
        <ToggleViews></ToggleViews>
    </span>);
  }
}
export default ValidInvalid;

        // <div class="row">
        //   <button
        //   onClick={(e)=> {this.toggleValid(e)}}
        //   class="col s2 waves-effect waves-light btn push-s5" >
        //     { ValidView ? 'Next' : 'Back' }
        //   </button>
        // </div>