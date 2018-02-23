import Component from '@ember/component';

export default Component.extend({
  actions: {
    closeModal(){
      let callback = this.get('alertCallback');
      this.set('title', null);
      this.set('message', null);
      this.set('alertModal', false);
      if(callback){
        callback();
      }
      this.set('alertCallback', null);
    }
  }
});
