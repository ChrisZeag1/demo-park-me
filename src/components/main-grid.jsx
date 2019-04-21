import React, { Component } from 'react';
import  RoadBtn from './road-btn';

export const Path = (conection, actionId) => {
  const middlePoint = { x: 0, y: 0 };
  console.log('conection >> ', conection);
  if (!~+conection.y && !~+conection.x) {
    middlePoint.x = Math.max(conection.to.left, conection.from.left);
    middlePoint.y = Math.min(conection.to.top, conection.from.top);
  }else if (~+conection.y && ~+conection.x) {
     middlePoint.x = Math.min(conection.to.left, conection.from.left);
    middlePoint.y = Math.max(conection.to.top, conection.from.top);
  }else {
    middlePoint.x = Math.max(conection.to.left, conection.from.left);
    middlePoint.y = Math.max(conection.to.top, conection.from.top);
  }
  return (<path
       key={actionId}
      style={{stroke:'rgb(255,0,0)', strokeWdth: 2, fill: 'none'}}
      d={'M' +conection.from.left +','+ conection.from.top + 
      ' Q' + middlePoint.x +','+ middlePoint.y + 
      ' ' + conection.to.left+','+ conection.to.top }
       />)
};


  let actionId = 0;
  const conections = [];
  let initPoints = {start: {left: 0, top: 0 }, end: {left: 0, top: 0}};
  let cv = { height: 1, width: 1 };

 class MainGrid  extends Component {
   constructor(props) {
     super(props);
     this.btnClick = this.btnClick.bind(this);
      this.myRef = React.createRef();
      this.state = {
        onNext: 'FROM_CONECTION',
        actionId,
        conections,
      };
   }



   btnClick(e, prop, pos) {
    e.preventDefault();
    if(this.state.onNext === 'FROM_CONECTION') {
      actionId ++;
      conections.push({
        from: {
          name: prop.id,
          top: pos.top,
          left: pos.left
        },
        x: prop.x,
        y: prop.y,
      });
      this.setState({
        onNext: 'TO_CONECTION',
        actionId,
        conections,
      });
      Object.assign(initPoints, {start: {
          top: pos.top, left: pos.left
        }});
    } else if (this.state.onNext === 'TO_CONECTION') {
      const lastIndex = conections.length - 1;
      conections[lastIndex] = Object.assign(conections[lastIndex], {
        to: {
          name: prop.id,
          top: pos.top,
          left: pos.left
        },
        x: conections[lastIndex].x || prop.x,
        y: conections[lastIndex].y || prop.y
      });
      initPoints.end = {
        top: pos.top, left: pos.left
      };
      this.setState({
        onNext: 'FROM_CONECTION',
        actionId,
        conections,
      });
    }
    console.log('this state', this.state);
    cv = {
      width: this.myRef.current.clientWidth,
      height: this.myRef.current.clientHeight
    };
   }

  render() {
    return (
      <div class="row Global text __ct" ref={this.myRef}>
         <div class="col s12">
                   <RoadBtn id="0" btnClick={this.btnClick} block="__vertical" direction="arrow_downward" y="1"></RoadBtn>
                   <RoadBtn id="1" btnClick={this.btnClick} block="__vertical" direction="arrow_downward" y="1"></RoadBtn>
                   <RoadBtn id="2" btnClick={this.btnClick} block="__vertical" direction="arrow_upward" y="1"></RoadBtn>
                   <RoadBtn id="3" btnClick={this.btnClick} block="__vertical" direction="arrow_upward" y="1"></RoadBtn>
         </div >

        <div class="col s4">
           <div class="row Global __no-m-b"><RoadBtn id="4" btnClick={this.btnClick} block="" direction="arrow_back" x="-1"></RoadBtn></div>
           <div class="row Global __no-m-b"><RoadBtn id="5" btnClick={this.btnClick} block="" direction="arrow_back" x="-1"></RoadBtn></div>
           <div class="row Global __no-m-b"><RoadBtn id="6" btnClick={this.btnClick} block="" direction="arrow_forward" x="-1"></RoadBtn></div> 
           <div class="row Global __no-m-b"><RoadBtn id="7" btnClick={this.btnClick} block="" direction="arrow_forward"  x="-1"></RoadBtn></div> 
        </div>
        <div class="col s4"></div>
        <div class="col s4">
           <div class="row Global __no-m-b"><RoadBtn id="8" btnClick={this.btnClick} block="" direction="arrow_back" x="1"></RoadBtn></div>
           <div class="row Global __no-m-b"><RoadBtn id="9" btnClick={this.btnClick} block="" direction="arrow_back" x="1"></RoadBtn></div>
           <div class="row Global __no-m-b"><RoadBtn id="10" btnClick={this.btnClick} block="" direction="arrow_forward" x="1"></RoadBtn></div> 
           <div class="row Global __no-m-b"><RoadBtn id="11" btnClick={this.btnClick} block="" direction="arrow_forward" x="1"></RoadBtn></div> 
        </div>

         <div class="col s12">
                   <RoadBtn id="12" btnClick={this.btnClick} block="__vertical" direction="arrow_downward" y="-1"></RoadBtn>
                   <RoadBtn id="13" btnClick={this.btnClick} block="__vertical" direction="arrow_downward" y="-1"></RoadBtn>
                   <RoadBtn id="14" btnClick={this.btnClick} block="__vertical" direction="arrow_upward" y="-1"></RoadBtn>
                   <RoadBtn id="15" btnClick={this.btnClick} block="__vertical" direction="arrow_upward" y="-1"></RoadBtn>
         </div >
<svg height={cv.height} width={cv.width} style={{'display': initPoints.end.left ? 'block': 'none' }}>
      {this.state.conections.map((conection, index) => conection.to && conection.to.top ? Path(conection, index) : '' )}
</svg>         
      </div>);
  }
}
// <line x1={initPoints.start.left} y1={initPoints.start.top} x2={initPoints.end.left} y2={initPoints.end.top} style={{stroke:'rgb(255,0,0)', strokeWdth: 2, fill: 'none'}} />
// <path style={{stroke:'rgb(255,0,0)', strokeWdth: 2, fill: 'none'}} d={'M' +initPoints.start.left +','+ initPoints.start.top +' Q' + Math.abs(initPoints.end.left - initPoints.start.left) / 2 +','+ Math.abs(initPoints.end.top - initPoints.start.top) / 2+' '+ initPoints.end.left+','+ initPoints.end.top} /> 
//<path style={{stroke:'rgb(255,0,0)', strokeWdth: 2, fill: 'none'}} d={'M' +initPoints.start.left +','+ initPoints.start.top +' Q' + Math.max(initPoints.end.left, initPoints.start.left) +','+ Math.max(initPoints.end.top, initPoints.start.top)+' '+ initPoints.end.left+','+ initPoints.end.top} /> 

export default MainGrid;