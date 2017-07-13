import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleUpload(){
      this.toggleProperty('uploadTab');
    }
  }
});
