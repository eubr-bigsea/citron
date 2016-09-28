import Ember from 'ember';
import groupByCategory from 'lemonade-ember/utils/group-by-category';

export default Ember.Route.extend({
  model() {
    this._super(...arguments);

    return groupByCategory(this.store.query('operation', {token: 123456}));
  }
});
