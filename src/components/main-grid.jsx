import React, { Component } from 'react';
import  RoadBtn from './road-btn';
import { Path } from './path';

 class MainGrid  extends Component {

   constructor(props) {
     super(props);
      this.myRef = React.createRef();
      RoadBtn.prototype.disabledNext = this.getDisableNext.bind(this);
      RoadBtn.prototype.offsetParent = this.myRef;
      RoadBtn.prototype.btnClick = this.props.btnClick;
      this.cv = { height: 0 , width: 0 };
   }

   getDisableNext(id) {
     if(this.props.conections.length) {
     const lastIndex = this.props.conections.length - 1;
     const lastConnection = this.props.conections[lastIndex];
     return  id === lastConnection.from.name && this.props.onNext === 'TO_CONECTION';
     }
     return false;
   }

   getSize() {
      const current = this.myRef.current.getBoundingClientRect();
      this.cv = {
        width: current.width,
        height: current.height
      };
   }

    componentDidUpdate() {
      this.getSize();
      console.log('updating >>>')
    }

  render() {
    return (
      <div id="main-grid" class="row Global text __ct" ref={this.myRef}>
         <div class="col s12">
                   <RoadBtn id="0" block="__vertical" direction="arrow_downward" y="1"></RoadBtn>
                   <RoadBtn id="1" block="__vertical" direction="arrow_downward" y="1"></RoadBtn>
                   <RoadBtn id="2" block="__vertical" direction="arrow_upward" y="1"></RoadBtn>
                   <RoadBtn id="3" block="__vertical" direction="arrow_upward" y="1"></RoadBtn>
         </div >

        <div class="col s4">
           <div class="row Global __no-m-b"><RoadBtn id="4" block="" direction="arrow_back" x="-1"></RoadBtn></div>
           <div class="row Global __no-m-b"><RoadBtn id="5" block="" direction="arrow_back" x="-1"></RoadBtn></div>
           <div class="row Global __no-m-b"><RoadBtn id="6" block="" direction="arrow_forward" x="-1"></RoadBtn></div> 
           <div class="row Global __no-m-b"><RoadBtn id="7" block="" direction="arrow_forward"  x="-1"></RoadBtn></div> 
        </div>
        <div class="col s4"></div>
        <div class="col s4">
           <div class="row Global __no-m-b"><RoadBtn id="8" block="" direction="arrow_back" x="1"></RoadBtn></div>
           <div class="row Global __no-m-b"><RoadBtn id="9" block="" direction="arrow_back" x="1"></RoadBtn></div>
           <div class="row Global __no-m-b"><RoadBtn id="10" block="" direction="arrow_forward" x="1"></RoadBtn></div> 
           <div class="row Global __no-m-b"><RoadBtn id="11" block="" direction="arrow_forward" x="1"></RoadBtn></div> 
        </div>

         <div class="col s12">
                   <RoadBtn id="12" block="__vertical" direction="arrow_downward" y="-1"></RoadBtn>
                   <RoadBtn id="13" block="__vertical" direction="arrow_downward" y="-1"></RoadBtn>
                   <RoadBtn id="14" block="__vertical" direction="arrow_upward" y="-1"></RoadBtn>
                   <RoadBtn id="15" block="__vertical" direction="arrow_upward" y="-1"></RoadBtn>
         </div>
<svg height={this.cv.height} width={this.cv.width} style={{'display': this.props.conections.length ? 'block': 'none' }}>
      {this.props.conections.map((conection, index) => conection.to && conection.to.top ? Path(conection, index, null, this.props.onSelect) : '' )}
</svg>         
      </div>);
  }
}
// <line x1={initPoints.start.left} y1={initPoints.start.top} x2={initPoints.end.left} y2={initPoints.end.top} style={{stroke:'rgb(255,0,0)', strokeWdth: 2, fill: 'none'}} />
// <path style={{stroke:'rgb(255,0,0)', strokeWdth: 2, fill: 'none'}} d={'M' +initPoints.start.left +','+ initPoints.start.top +' Q' + Math.abs(initPoints.end.left - initPoints.start.left) / 2 +','+ Math.abs(initPoints.end.top - initPoints.start.top) / 2+' '+ initPoints.end.left+','+ initPoints.end.top} /> 
//<path style={{stroke:'rgb(255,0,0)', strokeWdth: 2, fill: 'none'}} d={'M' +initPoints.start.left +','+ initPoints.start.top +' Q' + Math.max(initPoints.end.left, initPoints.start.left) +','+ Math.max(initPoints.end.top, initPoints.start.top)+' '+ initPoints.end.left+','+ initPoints.end.top} /> 

export default MainGrid;