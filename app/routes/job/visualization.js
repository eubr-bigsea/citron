import config from '../../config/environment';
import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    this._super(...arguments);

    return {
      component: `visualizations/${params.which}`,
      url: `${config.stand}/json/${params.id}/${params.which}.json`
    };
  }
});
