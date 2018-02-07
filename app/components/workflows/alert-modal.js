import Component from '@ember/component';

export default Component.extend({
  actions: {
    closeModal(){
      this.set('title', null);
      this.set('message', null);
      this.set('alertModal', false);
    }
  }
});
