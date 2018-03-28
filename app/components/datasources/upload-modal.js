import Component from '@ember/component';
import { inject as service } from '@ember/service';
import config from '../../config/environment';
import generateUUID from 'citron/utils/generate-uuid';
import Resumable from '@resumable';

export default Component.extend({
  session: service(),
  progress: null,

  init(){
    this._super(...arguments);
    this.set('progress', { value: 0, rounded: '0%'});
  },

  didInsertElement(){
    this._super(...arguments);
    var authToken = '123456';
    var token = this.get('session.data.authenticated.token');
    var email = this.get('session.data.authenticated.email');
    var userId = this.get('session.data.authenticated.userId');

    let resumable = new Resumable({
      headers: { 'Authorization': `Token token=${token}, email=${email}`, 'X-User-Id': userId },
      target: `${config.limonero}/datasources/upload`,
      query: {token: authToken, storage_id: 1},
      chunkSize: 1*1024*1024,
      simultaneousUploads: 1,
      testChunks: true,
      throttleProgressCallbacks: 1,
      method: "octet",
      permanentErrors:[400, 401, 403, 404, 415, 500, 501],
      chunkRetryInterval: 5000,
    });

    resumable.on('fileAdded', (file) =>{
      file.uniqueIdentifier = generateUUID();
      this.set('file', file);
      resumable.upload();
    });

    resumable.on('uploadStart', () => {
      this.set('file.status', 'uploading');
      this.set('file.isFinished', false);
      this.set('file.hasError', false);
    });

    resumable.on('fileProgress', (file) => {
      let progress = file.progress();
      this.set('progress.value', progress);
      this.set('progress.rounded', String(Math.round(progress*100)) + '%')
    });

    resumable.on('fileSuccess', (file,message) => {
      this.set('file.status', 'completed');
      this.get('resumable').removeFile(file);
      this.set('file.isFinished', true);
      this.set('file.success', message);
      this.get('reloadModel')();
    });

    resumable.on('fileError', (file, message) =>{
      var msg = JSON.parse(message);
      this.get('resumable').removeFile(file);
      this.set('file.status', 'error');
      this.set('file.hasError', true);
      this.set('file.errorMessage', msg.message);
    });

    this.set('resumable', resumable);
  },

  actions: {
    setFile(file){
      this.set('file', file);
    },
    closeUploadModal(){
      let r = this.get('resumable');
      r.cancel();
      r.removeFile(r.files[0]);
      this.set('file', null);
      this.set('uploadModal', false);
    },
  },
});
