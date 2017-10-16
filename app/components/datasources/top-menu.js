import Component from '@ember/component';

export default Component.extend({
  actions: {
    toggleUpload(){
      this.toggleProperty('uploadTab');
    }
  }
});
