import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import groupBy from 'citron/utils/group-by';


export default Route.extend({
  i18n: service(),

  model(){
    const query = {lang: this.get('i18n.locale')};
    return groupBy(this.store.query('operation', query), 'categories');
  },
  actions: {
    refreshModel(){
      this.refresh();
    }
  }
});
