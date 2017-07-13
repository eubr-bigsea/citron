import Ember from 'ember';
import ProgressBar from 'npm:progressbar.js';
import config from '../../config/environment';

const { inject: { service} } = Ember;

export default Ember.Component.extend({
  session: service(),
  isUploading: false,
  progress: { value: 0, rounded: '0%'},
  isPaused: false,

  init(){
    this._super(...arguments);
    this.addObserver('isVisible', this, 'visibleChange');
  },

  visibleChange(){
    this.set('isUploading', false);
    console.log(this.get('isVisible'));
  },


  didInsertElement(){
    this._super(...arguments);
    var authToken = '123456';
    var token = this.get('session.data.authenticated.token');
    var email = this.get('session.data.authenticated.email');
    let selfComponent = this;
    let resumable = new Resumable({
      headers: { 'Authorization': `Token token=${token}, email=${email}` },
      target: `${config.limonero}/datasources/upload`,
      query: {token: authToken, storage_id: 1},
      chunkSize: 1*1*10,
      simultaneousUploads: 1,
      testChunks: true,
      throttleProgressCallbacks: 1,
      method: "octet",
      permanentErrors:[400, 401, 404, 415, 500, 501],
      chunkRetryInterval: 5000,
    });

    var results = $('#results'),
      draggable = $('#dropzone'),
      uploadFile = $('#uploadFiles'),
      browseButton = $('#browseButton')

    if (resumable.support) {
      resumable.assignDrop(draggable);
      resumable.assignBrowse(browseButton);
    }

    resumable.on('catchAll',(event) => {
      console.log(event)
    })

    // Handle file add event
    resumable.on('fileAdded', (file) =>{
      resumable.upload();
    });
    resumable.on('uploadStart', (file) => {
      this.set('isUploading', true);
    });
    resumable.on('fileProgress', (file) => {
      let progress = file.progress();
      this.set('progress.value', progress);
      this.set('progress.rounded', String(Math.round(progress*100)) + '%')
    });
    resumable.on('pause', () =>{

      // Show resume, hide pause

    });
    resumable.on('complete', (file) => {
      // Hide pause/resume when the upload has completed
      console.log(file, ' !!complete');
    });
    resumable.on('fileSuccess', (file,message) =>{
      this.set('isVisible', false);
      // Reflect that the file upload has completed
      console.log('success', file, message);
    });
    resumable.on('error', (message, file) =>{
      console.log(message, file);
    });
    resumable.on('fileError', (file, message) =>{
      console.log(message, file);
    });

    this.set('resumable', resumable);





  },
  actions: {
    retry(){
      this.get('resumable').upload();
      this.toggleProperty('isPaused');
    },
    pause(){
      this.get('resumable').pause();
      this.toggleProperty('isPaused');
    },
    cancel(){
      let r = this.get('resumable');
      r.upload();
      r.removeFile(r.files[0]);
      r.assignBrowse($('#browseButton'));
      this.set('isUploading', false);
      this.set('progress', { value: 0, rounded: '0%'});
    },
    close(){
      this.set('isVisible', false);
      this.set('isUploading', false);
      this.set('progress', { value: 0, rounded: '0%'});
    }
  },
});
