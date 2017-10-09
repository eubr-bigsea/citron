import Ember from 'ember';

export default Ember.Component.extend({
  actions:  {
    sendID(){
      this.get('openLogs')(this.get('taskId'));
    }
  }
});
