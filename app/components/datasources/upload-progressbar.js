import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['status'],
  status: 'uploading',

  actions: {
    retry(){
      this.get('resumable').upload();
      this.toggleProperty('isPaused');
      this.set('status', 'uploading');
    },
    pause(){
      this.get('resumable').pause();
      this.toggleProperty('isPaused');
      this.set('status', 'paused');
    },
    cancel(){
      let r = this.get('resumable');
      r.cancel();
      r.removeFile(r.files[0]);
      this.set('isUploading', false);
      this.toggleProperty('isPaused');
      this.set('status', 'uploading');
    },
  }
});
