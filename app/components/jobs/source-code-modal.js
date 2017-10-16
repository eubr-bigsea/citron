/* global Prism */
import { copy } from '@ember/object/internals';

import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service('store'),

  didReceiveAttrs(){
    var sourceCode = copy(this.get('content.source'));
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
