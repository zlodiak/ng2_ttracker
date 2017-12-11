import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVarsService {

	private globalVars: Object = {};

  constructor() {}

  getVar(key) {
  	return this.globalVars[key];
  };

  setVar(key, value): void {
  	this.globalVars[key] = value;
  }; 

}
