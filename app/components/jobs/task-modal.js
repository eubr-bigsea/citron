import Component from '@ember/component';
import { computed } from '@ember/object';
import config from '../../config/environment';


export default Component.extend({
  didReceiveAttrs(){
    this._super(...arguments);
    console.log('selectedTask', this.get('selectedTask'))
    let selectedTask = this.get('selectedTask');
    if(selectedTask){
      selectedTask.tables.forEach((table) => {
        if(!table.title){
          table.title = table.message.split('h4>')[1].replace('</', '');
        }
      });
      this.set('dataUrl', `${config.caipirinha}/visualizations/${this.get('jobId')}/${selectedTask.id}`);
      this.set('viz', { component: `visualizations/${selectedTask.operation.slug}`.replace('bar-chart', 'vertical-bar-chart')});
    }
  },
  didRender(){
    $('a[href$="#params"]').click(function(){ $('.form-inline').find('*').prop('disabled', true) })
  },
  actions: {
    close(){
      this.set('selectedTask', null);
      this.set('taskModal', false);
    }
  }
});
