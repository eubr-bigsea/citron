import Component from '@ember/component';

export default Component.extend({
  actions: {
    saveWorkflow(){
      this.set('unsavedModal', false);
      this.get('saveWorkflow')(this.get('confirmTransition'));
    },
  },
});
