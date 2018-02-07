import Component from '@ember/component';
import moment from '@moment';

export default Component.extend({
  didInsertElement(){
    const name = moment().format("DD-MM HH:mm") + ' - ' + this.get('workflowName');
    const id = this.get('clusters.firstObject.id');
    this.set('jobHash', { name, cluster: { id } })
  }
});
