import React  from 'react';

export const Path = (conection, actionId, strokeWidth,onSelect) => {
  strokeWidth = strokeWidth || 4;
  const bgColor = conection.selected ? 'rgb(255,0,0)' : 'rgb(0,0,0)';
  const middlePoint = { x: 0, y: 0 };
  if (!~+conection.y && !~+conection.x) {
    middlePoint.x = Math.max(conection.to.left, conection.from.left);
    middlePoint.y = Math.min(conection.to.top, conection.from.top);
  }else if (~+conection.y && ~+conection.x) {
     middlePoint.x = Math.min(conection.to.left, conection.from.left);
    middlePoint.y = Math.max(conection.to.top, conection.from.top);
  }else if (!~+conection.y && ~+conection.x){
     middlePoint.x = Math.min(conection.to.left, conection.from.left);
    middlePoint.y = Math.min(conection.to.top, conection.from.top);
  }else  {
    middlePoint.x = Math.max(conection.to.left, conection.from.left);
    middlePoint.y = Math.max(conection.to.top, conection.from.top);
  }
  const q = !conection.y || !conection.x ? '' : ' Q' + middlePoint.x +','+ middlePoint.y;
  return (<path
       key={actionId}
       onClick={(e)=> { onSelect(e, actionId) }}
      style={{stroke: bgColor, strokeWidth, fill: 'none'}}
      d={'M' +conection.from.left +','+ conection.from.top + 
      q + 
      ' ' + conection.to.left+','+ conection.to.top }
       />)
};