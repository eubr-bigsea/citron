import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  store: service(),
  toDelete: null,

  actions: {
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
