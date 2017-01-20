import DS from 'ember-data';
import Ember from 'ember';

const { attr } = DS;

export default DS.Model.extend({
  created_at: attr('dates'),
  updated_at: attr('dates'),
  started: attr('dates'),
  finished: attr('dates'),
  status: attr('status'),
  user_id: DS.belongsTo('user'),
  workflow: attr(),

  hasCompleted: Ember.computed('status', function() {
    return this.get('status').message === 'COMPLETED';
  })
});
