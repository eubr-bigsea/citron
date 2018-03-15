import Component from '@ember/component';

export default Component.extend({
  classNameBindings: ['status'],

  actions: {
    retry(){
      this.get('resumable').upload();
      this.set('status', 'uploading');
    },
    pause(){
      this.get('resumable').pause();
      this.set('status', 'paused');
    },
    cancel(){
      let r = this.get('resumable');
      r.cancel();
      r.removeFile(r.files[0]);
      this.set('status', 'canceled');
      this.set('file', null);
    },
  }
});
