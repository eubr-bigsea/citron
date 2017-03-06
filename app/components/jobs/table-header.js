import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',

  actions: {
    selectAll(){
      this.get('selectAll')(event.currentTarget.checked);
    }
  },
});
