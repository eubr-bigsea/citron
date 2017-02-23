import Ember from 'ember';

export default Ember.Component.extend({
  isWarning: null,
  param: "alert('bla')",

  didReceiveAttrs(){
    if(this.get('message.type') === 'Warning'){
      this.set('isWarning', true);
    } else {
      this.set('isWarning', false);
    }
  },

  actions:{
    dismiss(param){
      $('#confirm-modal').removeClass('show');
      var component = this;
      component.get('id');
      eval(param);
    },
    confirmed(){ this.get('confirmedTransition')(); },
    canceled(){ this.get('canceledTransition')(); },
  },
});
