import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['name-editor'],
  tagName: 'div',
  actions:{
    toggleEdit() {
      this.toggleProperty('isEditing');
      this.get('workflow').save();
    },
  },
});
