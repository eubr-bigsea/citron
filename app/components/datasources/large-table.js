import Component from '@ember/component';
import { inject as service } from '@ember/service';
import config from '../../config/environment';
import $ from 'jquery';

export default Component.extend({
  store: service(),
  session: service(),
  toDelete: null,
  shareDatasource: null,
  shareModal: false,
  limoneroUrl: config.limonero,

  didInsertElement(){
    // search through table
    var $rows = $('#datasourceTable tr');
    $('#searchInput').keyup(function() {
        var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

        $rows.show().filter(function() {
            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });
  },

  didReceiveAttrs(){
    this._super(...arguments);
    let token = this.get('session.data.authenticated.token');
    let email = this.get('session.data.authenticated.email');
    this.set('limoneroUrl', `${config.limonero}/datasources/`)
    this.set('endPoint', `/download?Token token=${token} email=${email}&token=123456`)
  },


  actions: {
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
