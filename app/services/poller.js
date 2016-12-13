import Ember from 'ember';

export default Ember.Service.extend({
  started: false,

  schedulePollEvent(event) {
    return Ember.run.later(()=>{
      event.apply(this);
      this.set('timer', this.schedulePollEvent(event));
    }, 3000);
  },

  startPolling(callback) {
    if(!this.get('started')) {
      this.set('started', true);
      this.set('timer', this.schedulePollEvent(callback));
    }
  },

  stopPolling() {
    Ember.run.cancel(this.get('timer'));
    this.set('started', false);
  }
});
