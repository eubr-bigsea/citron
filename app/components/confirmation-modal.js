import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  actions:{

    submit(){
      this.set('modal3', false);
      this.sendAction('confirmedTransition');
    },
    deletar(){
      this.get('store').findRecord('workflow', this.get('toDelete')).then(function(model){model.destroyRecord(); });
      this.set('modal3', false);
      $("#flash span").text("The workflow was deleted.").show().parent().fadeIn().delay(2000).fadeOut('slow', function() { $("#flash span").text('') });
    },
    cancel(){
      this.sendAction('canceledTransition');
      this.set('modal3', false);
    },
  }
});
