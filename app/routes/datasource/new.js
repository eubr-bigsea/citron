import Ember from 'ember';
import config from '../../config/environment';

const {$: { ajax }, inject: { service } } = Ember;

export default Ember.Route.extend({
  currentUser: service('current-user'),

  model() {
    this._super(...arguments);
    var currentUser = this.get('currentUser');
    var defaultDatasource = {
      user_id: currentUser.id,
      name: "My new database",
      description: "This database is..."
    };
    return defaultDatasource;
  },
  actions:{
    create(){
      var datasource = this.currentModel;
      ajax({
        url: `${config.ai_social_rails}/datasources`,
        type: 'POST',
        data: { datasource: datasource }
      });
    },
  },
});
