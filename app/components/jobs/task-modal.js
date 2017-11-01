import Component from '@ember/component';
import { computed } from '@ember/object';


export default Component.extend({
  didReceiveAttrs(){
    this._super(...arguments);
    console.log('selectedTask', this.get('selectedTask'))
  },
});
