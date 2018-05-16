import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import groupBy from 'citron/utils/group-by';
import { extrasJson } from 'citron/utils/documentation-json';


export default Route.extend({
  i18n: service(),

  model(){
    const query = {
      lang: this.get('i18n.locale'),
      platform: '1'
    };
    return groupBy(this.store.query('operation', query), 'categories');
  },
  setupController(controller, model){
    let operations = [];
    let key;
    let locale = this.get('i18n.locale');
    for(key in extrasJson){
      let operation = {
        name: extrasJson[key]['name'][locale],
        slug: extrasJson[key]['slug']
      }
      operations.push(operation);
    }
    model.unshift({"_data": operations });
    this._super(...arguments);

  },
  actions: {
    refreshModel(){
      this.refresh();
    }
  }
});
