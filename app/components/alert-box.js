import Ember from 'ember';

export default Ember.Component.extend({
  isWarning: null,
  isDeleting: null,
  param: "alert('bla')",

  didReceiveAttrs(){
    var messageType = this.get('message.type');
    if(messageType === 'Warning'){
      this.set('isWarning', true);
    } else if(messageType === 'Delete'){
      this.set('isDeleting', true);
    } else {
      this.set('isWarning', false);
      this.set('isDeleting', false);
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
    deleteWorkflow(){ this.get('deleteWorkflow')(); },
  },
});
