import Component from '@ember/component';

export default Component.extend({
  actions:  {
    sendID(){
      this.get('openLogs')(this.get('taskId'));
    }
  }
});
