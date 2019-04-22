import React, { Component } from 'react';
import MainGrid  from './main-grid';
import { Path } from './path';
import { Labels } from '../helpers/label';
import { BrowserRouter as Router, Link } from "react-router-dom";
let actionId = 0;

class Manouvers  extends Component {
  constructor(props) {
    super(props);
      this.state = {
        onNext: 'FROM_CONECTION',
          on:'valid',
        actionId,
        conections: [],
        totalCons: []
      };
  }


  btnClick(e, prop, pos) {
    e.preventDefault();
    const gridVal = (prop.x ? prop.x + 'x' : prop.y + 'y').replace('1', '');
    const labelName = Labels.getLocationLabel(gridVal, prop.direction);
    if(this.state.onNext === 'FROM_CONECTION') {
      actionId ++;
      this.state.totalCons.push({
        from: {
          name: prop.id,
          top: pos.top,
          left: pos.left,
          abs: gridVal
        },
        x: prop.x,
        y: prop.y,
        label: labelName,
        type: this.state.on
      });
      this.setState({
        onNext: 'TO_CONECTION',
        actionId,
        totalCons: this.state.totalCons,
        conections: this.state.totalCons.filter(con => con.type === this.state.on),
      });
    } else if (this.state.onNext === 'TO_CONECTION') {
      const lastIndex = this.state.totalCons.length - 1;
      Object.assign(this.state.totalCons[lastIndex], {
        to: {
          name: prop.id,
          top: pos.top,
          left: pos.left,
          abs: gridVal,
        },
        x: this.state.totalCons[lastIndex].x || prop.x,
        y: this.state.totalCons[lastIndex].y || prop.y,
        label: this.state.totalCons[lastIndex].label +' to ' + labelName,
        type: this.state.on
      });
      this.setState({
        onNext: 'FROM_CONECTION',
        actionId,
        totalCons: this.state.totalCons,
        conections: this.state.totalCons.filter(con => con.type === this.state.on),
      });
    }
    console.log('this state', this.state);
   }

   // @param factor  to decrease svg
   Manouver(conection, factor, index) {
      const newPoints = Object.assign({}, conection, {
        to: {
          left: conection.to.left / factor,
          top:  conection.to.top / factor,
        },
        from: {
          left: conection.from.left / factor,
          top:  conection.from.top / factor,          
        }
      });
      return (<div key={'outer-svg-' + index} class="manouver-container">
        <div class="title"> <h5>{index +1}.</h5><h6>{conection.label}</h6></div>
          <span class="remove" onClick={(e) => { this.deleteManouver(e, index) }}> <i class="material-icons tiny">close</i></span>
        <div class="manouver" onClick={(e) => { this.selectManouver(e, index) }}>
          <svg   height={452/factor} width={1008/factor}>
            {Path(newPoints, index, 2)}
          </svg>
        </div>
        </div>);
   }

  selectManouver(e,selectedIndex) {
    e.preventDefault();
    this.state.conections.forEach((con, index) => {
      con.selected = false;
    });
    this.state.conections[selectedIndex].selected = true;
    this.setState({conections: this.state.conections});
  }

  deleteManouver(e, selectedIndex) {
    e.preventDefault();
    const spliced = this.state.conections.splice(selectedIndex, 1);
    let totalIndex;
    this.state.totalCons.some((con, index) => {
      if(con.label === spliced[0].label) {
        totalIndex = index;
        return true;
      }
    });
    this.state.totalCons.splice(totalIndex, 1);
    this.setState({conections: this.state.conections, totalCons: this.state.totalCons});
  }

  getRoutingLink() {
    if(this.state.on === 'valid') {
      return (<Link to="/invalid/" onClick={(e)=>{ this.switchPage(e, 'invalid') }}>
        <button 
          className="waves-effect waves-light btn __submit">
          To invalid
          <i className="material-icons right" >chevron_right</i>
       </button>
      </Link>)
    }else {
      return (<Link to="/valid/" onClick={(e)=>{ this.switchPage(e, 'valid') }}>
       <button 
       className="waves-effect waves-light btn __submit">
       <i className="material-icons left" >chevron_left</i>
       To valid
       </button>
      </Link>)
    }
  }
  
  switchPage(e, on) {
    e.preventDefault();
    this.setState({
      on,
      onNext: 'FROM_CONECTION',
      conections: this.state.totalCons.filter(con => con.type === on)
    });
  }

  getDisplayedIfcon() {
    return this.state.conections.length && this.state.conections[0].to ? 'block': 'none'
  }

  render() {  
    return (<div>
      <h1 class="Global text __ct">Select all the {this.state.on} maneuvers</h1>
      <MainGrid btnClick={this.btnClick.bind(this)} {...this.state} onSelect={this.selectManouver.bind(this)}></MainGrid>

      <h4 style={{display:  this.getDisplayedIfcon() }}>Your manouvers </h4>
       <div class="all-manouver">
           {
          this.state.conections.map((conection,index) => {
            if (conection.to && conection.to.top) {
            return this.Manouver(conection, 4, index);
            } 
           })
          }
       </div>
       <div className="Global text __ct row __m-p-med">
           <Router>
             {this.getRoutingLink()}
          </Router>
       </div>
    </div>)
  }
}

export default Manouvers;