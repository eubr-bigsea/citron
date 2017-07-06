import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Component.extend({
  didInsertElement(){
    this._super(...arguments);
    console.log(config.limonero);
    var authToken = '123456';
    let selfComponent = this;
    let resumable = new Resumable({
      target: `${config.limonero}/datasources/upload?token=${authToken}`,
      query: {token: authToken},
      chunkSize: 1*1024*1024,
      simultaneousUploads: 1,
      testChunks: true,
      throttleProgressCallbacks: 1,
      method: "octet",
      permanentErrors:[400, 401, 404, 415, 500, 501],
      chunkRetryInterval: 5000,
    });
    var results = $('#results'),
      draggable = $('#dragHere'),
      uploadFile = $('#uploadFiles'),
      browseButton = $('#browseButton'),
      nothingToUpload = $('[data-nothingToUpload]');
    selfComponent.resumable = resumable;
    selfComponent.supported = resumable.support;
    if (selfComponent.supported) {
      resumable.assignDrop(draggable);
      resumable.assignBrowse(browseButton);
    }

    let getFileRef = (file) => {
      return selfComponent.resumableList.filter(
        (f) => f.file.uniqueIdentifier === file.uniqueIdentifier)[0];
    };
    uploadFile.on('click', function () {
      if (results.children().length > 0) {
        resumable.upload();
      } else {
        nothingToUpload.fadeIn();
        setTimeout(function () {
          nothingToUpload.fadeOut();
        }, 3000);
      }
    });
    // Handle file add event
    resumable.on('fileAdded', (file) =>{
      debugger;
      var template =
        '<div data-uniqueid="' + file.uniqueIdentifier + '">' +
        '<div class="fileName">' + file.fileName + ' (' + file.file.type + ')' + '</div>' +
        '<div class="large-6 right deleteFile">X</div>' +
        '<div class="progress large-6">' +
        '<span class="meter" style="width:0%;"></span>' +
        '</div>' +
        '</div>';

      results.append(template);
      // Show progress pabr
      selfComponent.showProgress = true;
      // Show pause, hide resume
      selfComponent.showPause = true;
      selfComponent.showResume = false;
      // Add the file to the list
      selfComponent.resumableList.splice(0, 0,
        {file, done: false, progress: '0', message: ''});
      // Actually start the upload
      resumable.upload();
    });
    resumable.on('pause', () =>{
      // Show resume, hide pause
      selfComponent.showResume = true;
      selfComponent.showPause = false;
    });
    resumable.on('complete', () =>{
      // Hide pause/resume when the upload has completed
      selfComponent.showPause = false;
      selfComponent.showResume = false;
      selfComponent.showProgress = false;
    });
    resumable.on('fileSuccess', (file,message) =>{
      // Reflect that the file upload has completed
      let fileRef = getFileRef(file);
      fileRef.done = true;
    });
    resumable.on('error', (message, file) =>{
      let fileRef = getFileRef(file);
      fileRef.message = JSON.parse(message);
      selfComponent.showPause = false;
      selfComponent.showProgress = false;
    });
    resumable.on('fileError', (file, message) =>{
      let fileRef = getFileRef(file);
      fileRef.message = JSON.parse(message);
      selfComponent.showPause = false;
      selfComponent.showProgress = false;
    });
    resumable.on('fileProgress', (file) =>{
      // Handle progress for both the file and the overall upload
      let fileRef = getFileRef(file);
      fileRef.progress = Math.floor(file.progress()*100) + '%';
      selfComponent.showProgress = true;
      if (selfComponent.$refs.progress){
        selfComponent.$refs.progress.style.width = Math.floor(resumable.progress()*100) + '%';
      }
    });








  },
});
