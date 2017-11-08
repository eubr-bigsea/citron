import Component from '@ember/component';

export default Component.extend({

  actions:{
    submit(){ this.set('modal', false); },
    cancel(){ this.set('modal', false); },
  }
});
