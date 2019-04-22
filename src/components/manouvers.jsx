import React, { Component } from 'react';
import MainGrid  from './main-grid';
import { Path } from './path';
import { Labels } from '../helpers/label';

let actionId = 0;

class Manouvers  extends Component {
  constructor(props) {
    console.log('updating >>')
    super(props);
      this.state = {
        onNext: 'FROM_CONECTION',
        actionId,
        conections: [],
      };
  }

  btnClick(e, prop, pos) {
    e.preventDefault();
    const gridVal = (prop.x ? prop.x + 'x' : prop.y + 'y').replace('1', '');
    const labelName = Labels.getLocationLabel(gridVal, prop.direction);
    if(this.state.onNext === 'FROM_CONECTION') {
      actionId ++;
      this.state.conections.push({
        from: {
          name: prop.id,
          top: pos.top,
          left: pos.left,
          abs: gridVal
        },
        x: prop.x,
        y: prop.y,
        label: labelName
      });
      this.setState({
        onNext: 'TO_CONECTION',
        actionId,
        conections: this.state.conections,
      });
    } else if (this.state.onNext === 'TO_CONECTION') {
      const lastIndex = this.state.conections.length - 1;
      Object.assign(this.state.conections[lastIndex], {
        to: {
          name: prop.id,
          top: pos.top,
          left: pos.left,
          abs: gridVal,
        },
        x: this.state.conections[lastIndex].x || prop.x,
        y: this.state.conections[lastIndex].y || prop.y,
        label: this.state.conections[lastIndex].label +' to ' + labelName
      });
      this.setState({
        onNext: 'FROM_CONECTION',
        actionId,
        conections: this.state.conections,
      });
    }
    console.log('this state', this.state);
   }

   // @param factor > to decrease svg
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
    this.state.conections.splice(selectedIndex, 1);
    this.setState({conections: this.state.conections});
  }

  render() {
    return (<div>
      <h1 class="Global text __ct">Select all the {this.props.type} maneuvers</h1>
      <MainGrid btnClick={this.btnClick.bind(this)} {...this.state} onSelect={this.selectManouver.bind(this)}></MainGrid>

      <h4 style={{display: this.state.conections.length ? 'block': 'none' }}>Your manouvers </h4>
       <div class="all-manouver">
           {
          this.state.conections.map((conection,index) => {
            if (conection.to && conection.to.top) {
            return this.Manouver(conection, 4, index);
            } 
           })
          }
       </div>
    </div>)
  }
}

export default Manouvers;