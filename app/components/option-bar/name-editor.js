import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['name-editor'],
  actions:{
    hasChanged(){ this.get('hasChanged')(true); },
  },
});
