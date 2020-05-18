import Vue from 'vue';
import Mask from '../mask/mask.vue';

const context = {
  zIndex:3000,
  modalStack:[],
  count:0,
  get topModal (){
    return this.stack[this.stack.length -1]
  }
}

export default {
  open(vm,config){
    
  },
  close(){},
  update(){},
  clickHandler(){}
}