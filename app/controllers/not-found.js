import Ember from 'ember';

const { String: { pluralize } } = Ember;

export default Ember.Controller.extend({
  queryParams: ['resource'],
  resource: 'page',
  resources: Ember.computed('resource', function() {
    var resources = this.get('resource') === 'page' ? 'home' : pluralize(this.get('resource'))
    return resources;
  }),
});
