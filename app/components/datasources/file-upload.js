/*global Resumable */
import Ember from 'ember';
import config from '../../config/environment';

const { inject: { service} } = Ember;

export default Ember.Component.extend({
  session: service(),
  isUploading: false,
  progress: { value: 0, rounded: '0%'},
  isPaused: false,
  serverMessage: {},

  didInsertElement(){
    this._super(...arguments);
    var authToken = '123456';
    var token = this.get('session.data.authenticated.token');
    var email = this.get('session.data.authenticated.email');
    let resumable = new Resumable({
      headers: { 'Authorization': `Token token=${token}, email=${email}` },
      target: `${config.limonero}/datasources/upload`,
      query: {token: authToken, storage_id: 1},
      chunkSize: 1*1024*1024,
      simultaneousUploads: 1,
      testChunks: true,
      throttleProgressCallbacks: 1,
      method: "octet",
      permanentErrors:[400, 401, 404, 415, 500, 501],
      chunkRetryInterval: 5000,
    });

    if (resumable.support) {
      resumable.assignDrop($('#dropzone'));
      resumable.assignBrowse($('#browseButton'));
    }

    resumable.on('fileAdded', (file) =>{
      this.set('file', file);
      resumable.upload();
    });

    resumable.on('uploadStart', () => {
      this.set('isUploading', true);
    });

    resumable.on('fileProgress', (file) => {
      let progress = file.progress();
      this.set('progress.value', progress);
      this.set('progress.rounded', String(Math.round(progress*100)) + '%')
    });

    resumable.on('fileSuccess', (file,message) =>{
      this.get('resumable').removeFile(file);
      this.set('isUploading', false);
      this.set('serverMessage.status', 'success');
      this.set('serverMessage.fileSuccess', message);
      this.set('serverMessage.fileName', file.fileName);
    });

    resumable.on('fileError', (file, message) =>{
      var msg = JSON.parse(message);
      this.get('resumable').removeFile(file);
      this.set('isUploading', false);
      this.set('serverMessage.status', 'error');
      this.set('serverMessage.fileError', msg.message);
      this.set('serverMessage.fileName', file.fileName);
    });

    this.set('resumable', resumable);
  },

  actions: {
    minimize(){
      this.set('isVisible', false);
      this.set('serverMessage', {});
    },
    dismissMessage(){
      this.set('serverMessage',{});
    }
  },
});
