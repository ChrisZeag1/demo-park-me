
const locationMapping = {
'-x': 'west',
'x': 'east',
'-y': 'north',
'y': 'south',
};

export class Labels {

  static getLocationLabel (abs, buttonName){
    buttonName = buttonName || '';
    return locationMapping[abs] + buttonName.replace('arrow_', ' ');
  }
}
