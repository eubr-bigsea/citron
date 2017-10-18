import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service('store'),

  actions:{
    submit(){
      this.set('modal', false);
    },

    cancel(){
      this.set('modal', false);
    },
  }
});
