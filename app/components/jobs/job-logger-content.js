import Component from '@ember/component';

export default Ember.Component.extend({
  actions:  {
    sendID(){
      this.get('openLogs')(this.get('taskId'));
    }
  }
});
