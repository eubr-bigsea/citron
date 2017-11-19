import DS from 'ember-data';
import { computed } from '@ember/object';

const { attr } = DS;

export default DS.Model.extend({
  /* Config STAND */
  user: attr(),
  workflow: attr(),
  cluster: attr(),
  created: attr('dates'),
  started: attr('dates'),
  finished: attr('dates'),
  status: attr('status'),
  steps: attr(),
  results: attr(),
  status_text: attr(),

  isCompleted: computed('status', function(){
    return (this.get('status') === 'completed' || this.get('status') === 'error');
  }),
  isRunning: computed('status', function(){
    return (this.get('status') === 'running' || this.get('status') === 'waiting');
  }),

});
