import { later, cancel } from '@ember/runloop';
import Service from '@ember/service';

export default Service.extend({
  started: false,

  schedulePollEvent(event) {
    return later(()=>{
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
    cancel(this.get('timer'));
    this.set('started', false);
  }
});
