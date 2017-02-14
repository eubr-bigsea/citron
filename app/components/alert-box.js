import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    confirmed(){ this.get('confirmedTransition')(); },
    canceled(){ this.get('canceledTransition')(); },
  },
});
