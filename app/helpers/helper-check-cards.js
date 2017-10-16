import { helper } from '@ember/component/helper';

export function helperCheckCards(params) {
  var cards = params[0];
  var result = cards.findBy('id', params[1].toString());
  if(result === undefined){
    return false;
  }else{
    return true;
  }
}
export default helper(helperCheckCards);
