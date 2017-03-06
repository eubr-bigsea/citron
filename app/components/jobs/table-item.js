import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  poller: Ember.inject.service(),
  store: Ember.inject.service(),
  currentUser: Ember.inject.service('current-user'),

  didInsertElement() {
    var store = this.get('store');
    var currentUserId = this.get('currentUser').id;
    this.get('poller').startPolling(function() {
      store.query('job', { user_id: currentUserId });
    });
  },

  didDestroyElement() {
    this.get('poller').stopPolling();
  },

  actions: {
    hasCompleted() {
      this.get('poller').stopPolling();
    },
    checked(jobId){
      this.get('wasChecked')(jobId, event.currentTarget.checked);
    },
    deleteWorkflow(workflow){
      var confirmText = `Delete workflow ${workflow.get('name')} ?`;
      if(confirm(confirmText)){ workflow.destroyRecord(); }
    },
  },
});
