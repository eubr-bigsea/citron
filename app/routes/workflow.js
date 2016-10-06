import Ember from 'ember';
import groupBy from 'lemonade-ember/utils/group-by';

export default Ember.Route.extend({
  model() {
    this._super(...arguments);

    return groupBy(this.store.findAll('operation'), 'categories');
  }
});
