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

    deleteDashboard(dashboard){
      this.set('toDelete', dashboard);
      var modal = {
        title: 'modal.delete.dashboard.title',
        message: 'modal.delete.dashboard.message',
        submitButton: 'modal.delete.dashboard.submitButton',
      };

      this.set('modalContent', modal);
      this.set('modal', true);
    },
  }
});
