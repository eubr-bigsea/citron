import Component from '@ember/component';
import $ from 'jquery';
import config from '../../config/environment';


export default Component.extend({
  didReceiveAttrs(){
    this._super(...arguments);
    let activeTab = this.get('activeTab');
    let selectedTask = this.get('selectedTask');
    console.log('selectedTask', selectedTask)
    if(selectedTask){
      selectedTask.tables.forEach((table) => {
        if(!table.title){ table.title = table.message.split('h4>')[1].replace('</', ''); }
      });
      if(!activeTab){
        if(selectedTask.result){ this.set('activeTab', 'results');
        } else { this.set('activeTab', 'logs'); }
      }

      this.set('dataUrl', `${config.caipirinha}/visualizations/${this.get('jobId')}/${selectedTask.id}`);
      this.set('viz', { component: `visualizations/${selectedTask.operation.slug}`.replace('bar-chart', 'vertical-bar-chart')});
    }
  },
  didRender(){
    $('a[href$="#params"]').click(function(){ $('.form-inline').find('*').prop('disabled', true) })
    $('#tabs ul li a').removeClass('active');
    $('#tabs ul li a[href="#'+ this.get('activeTab') +'"]').addClass('active')
  },
  actions: {
    close(){
      this.set('selectedTask', null);
      this.set('taskModal', false);
    },
    activateTab(tab){
      this.set('activeTab', tab);
      return tab;
    }
  }
});
