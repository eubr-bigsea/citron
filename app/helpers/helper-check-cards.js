import Ember from 'ember';

export function helperCheckCards(params) {
  var cards = params[0];
  var result = cards.findBy('id', params[1].toString());
  if(result === undefined){
    return false;
  }else{
    return true;
  }
}
export default Ember.Helper.helper(helperCheckCards);
