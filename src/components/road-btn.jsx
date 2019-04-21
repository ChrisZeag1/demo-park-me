
import React, { Component } from 'react';
 
 const classBase= 'waves-effect waves-light btn Global ';

 class RoadBtn  extends Component{
   constructor(props) {
     super(props);
     this.props = props;
     this.myRef = React.createRef();
   }
   roadAction(e) {
     const pos = this.myRef.current.getBoundingClientRect();
      const body = document.body.getBoundingClientRect();
      let position;
      if(pos.width > pos.height) {
        position = {
         top: pos.top + body.y,
         left: pos.left - body.x + pos.width
        };
      }else {
        position = {
         top: pos.top + body.y + (~(+this.props.y) ? pos.height - 20 : -20),
         left: pos.left - body.x + (pos.width/20) + 20
        };
      }
     this.props.btnClick(e, this.props, position);
   }
   render() {
  return (<button 
    ref={this.myRef}
    onClick={this.roadAction.bind(this)}
    id={this.props.id}
    className={classBase + this.props.block}><i class="material-icons large">{this.props.direction}</i>
  </button>);

   }
 }

export default RoadBtn
