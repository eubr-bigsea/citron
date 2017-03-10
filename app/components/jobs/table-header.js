import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',

  actions: {
    sortJob(prop){
      this.get('changeSorter')(prop);
    }
  },
});
