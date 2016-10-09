'use strict';

class Option {
  constructor(data) {
    this.selected = data.selected;
    this.options = data.options
  }
  select(value){
    if(this.options[value]){
      this.selected = this.options[value];
    }else{
      throw "unknown option"
    }
  }
}
 module.exports = Option;
