import Ember from 'ember';
import config from '../../config/environment';

const {$: { ajax }, inject: { service }, run} = Ember;

export default Ember.Route.extend({
  model(params) {
    this._super(...arguments);
    var requestOptions = {
      url: `${config.ai_social_rails}/datasources/${params.id}`,
      type: 'GET'
    };
    var datasource = {};
    return ajax(requestOptions);
  },
  actions:{
    save(){
      var datasource = this.currentModel;
      ajax({
        url: `${config.ai_social_rails}/datasources/${datasource.id}`,
        type: 'PATCH',
        data: {datasource: datasource}
      });
    },
  },
});
