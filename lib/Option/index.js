'use strict';

class Option {
  constructor(data) {
    this.options = data.options
    this.default = data.default || 0;
    this.selected = data.selected || this.default

  }
  select(value){
    if(this.options[value]){
      this.selected = value;
    }else{
      throw "unknown option"
    }
  }
}
 module.exports = Option;
