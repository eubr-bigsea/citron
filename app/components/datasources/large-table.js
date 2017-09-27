import Ember from 'ember';
import config from '../../config/environment';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  store: service(),
  toDelete: null,
  shareDatasource: null,
  shareModal: false,
  limoneroUrl: config.limonero,


  actions: {
    download(datasource){

      $.ajax({
        type: "GET",
        url: `${config.limonero}/datasources/${datasource.id}/download`,
        success: function(response, status, xhr) {
          // check for a filename
          var filename = datasource.get('name');

          var type = xhr.getResponseHeader('Content-Type');
          var blob = new Blob([response], { type: type });

          if (typeof window.navigator.msSaveBlob !== 'undefined') {
            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
            window.navigator.msSaveBlob(blob, filename);
          } else {
            var URL = window.URL || window.webkitURL;
            var downloadUrl = URL.createObjectURL(blob);

            if (filename) {
              // use HTML5 a[download] attribute to specify filename
              var a = document.createElement("a");
              // safari doesn't support this yet
              if (typeof a.download === 'undefined') {
                window.location = downloadUrl;
              } else {
                a.href = downloadUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
              }
            } else {
              window.location = downloadUrl;
            }

            setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
          }
        }
      });
    },
    share(datasource){
      this.toggleProperty('shareModal');
      this.set('shareDatasource', datasource);
    },
    submit(){
      this.get('toDelete').destroyRecord().then(
        () => { this.set('modal', false); $("#flashSuccess").show().fadeIn().delay(2000).fadeOut('slow'); },
        () => { this.set('modal', false); $("#flashError").show().fadeIn().delay(2000).fadeOut('slow'); }
      )
      this.set(' toDelete', null);
    },

    deleteDatasource(datasource){
      this.set('toDelete', datasource);
      var modal = {
        title: 'modal.delete.datasource.title',
        message: 'modal.delete.datasource.message',
        submitButton: 'modal.delete.datasource.submitButton',
      };

      this.set('modalContent', modal);
      this.set('modal', true);
    },
  }
});
