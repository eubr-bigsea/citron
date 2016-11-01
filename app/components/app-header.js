import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    toggleEdit() {
      this.toggleProperty('isEditing');
      this.get('workflow').save();
    },
  },
});
