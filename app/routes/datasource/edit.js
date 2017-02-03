import Ember from 'ember';
import config from '../../config/environment';

const {$: { ajax }} = Ember;

export default Ember.Route.extend({
  model(params) {
    this._super(...arguments);
    var requestOptions = {
      url: `${config.stand}/datasources/${params.id}`,
      type: 'GET'
    };
    return ajax(requestOptions);
  },
  actions:{
    save(){
      var datasource = this.currentModel;
      ajax({
        url: `${config.stand}/datasources/${datasource.id}`,
        type: 'PATCH',
        data: {datasource: datasource}
      });
    },
  }
});
