import Ember from 'ember';

const { inject: { service }, Component } = Ember;

export function helperCheckCards(params, hash) {
  var cards = params[0];
  var result = cards.findBy('id', params[1].toString());
  if(result === undefined){
    return false;
  }else{
    return true;
  }
  return params;
}

export default Ember.Helper.helper(helperCheckCards);
