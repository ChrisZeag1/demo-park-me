
import React, { Component } from 'react';
 
 const classBase= 'waves-effect waves-light btn Global ';

 class RoadBtn  extends Component {

   constructor(props) {
     super(props);
     this.props = props;
     this.myRef = React.createRef();
     this.wider = this.props.x ? ' __with-2 ' : '';
   }

   roadAction(e) {
     const pos = this.myRef.current.getBoundingClientRect();
      const mainGrid = this.offsetParent.current.getBoundingClientRect();
      let position;
      if(pos.width > pos.height) {
        position = {
         top: pos.top - mainGrid.top + pos.height / 2 ,
         left: pos.left - mainGrid.left + (~(+this.props.x) ? 0: pos.width)
        };      
      }else {
        position = {
         top: pos.top - mainGrid.top + (~(+this.props.y) ? pos.height : 0),
         left: pos.left - mainGrid.left + pos.width/2
        };
      }
     this.btnClick(e, this.props, position);
   }

   render() {
  return (<button 
    ref={ this.myRef }
    disabled={ this.disabledNext(this.props.id) }
    onClick={ this.roadAction.bind(this) }
    id={ this.props.id }
    className={ classBase + this.wider + this.props.block }><i class="material-icons large">{ this.props.direction }</i>
  </button>);

   }
 }

export default RoadBtn
