/* global Prism */
import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),

  didReceiveAttrs(){
    var sourceCode = Ember.copy(this.get('content.source'));
    var isVisible = this.get('modal');
    if(sourceCode && isVisible){
      var codeHighlighted = Prism.highlight(sourceCode, Prism.languages.python);
      $('#job-source-code').append(codeHighlighted);
    }
  },

  actions:{
    submit(){
      this.set('modal', false);
    },

    cancel(){
      this.set('modal', false);
    },
  }
});
