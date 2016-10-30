import Ember from 'ember';

const { inject: { service }, Component } = Ember;

export default Component.extend({
  session: service('session'),
  currentUser: service('current-user'),
  isEditing: false,

  actions: {
    invalidateSession(){
      this.get('session').invalidate();
    },
    toggleEdit() {
      this.toggleProperty('isEditing');
      this.get('workflow').save();
    }
  }
});
