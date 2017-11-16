import Component from '@ember/component';
import $ from 'jquery';
import { inject as service } from '@ember/service';
import config from '../../config/environment';
import { computed } from '@ember/object';



export default Component.extend({
  i18n: service(),

  locale: computed('i18n', function(){ return this.get('i18n.locale')} ),

  didReceiveAttrs(){
    this._super(...arguments);
    let selectedTask = this.get('selectedTask');
    console.log('selectedTask', selectedTask)
    if(selectedTask && selectedTask.result){
      this.set('dataUrl', `${config.caipirinha}/visualizations/${this.get('jobId')}/${selectedTask.id}`);
      this.set('viz', { component: `visualizations/${selectedTask.operation.slug}`.replace('bar-chart', 'vertical-bar-chart')});
    }
  },
  didRender(){
    $('a[href$="#params"]').click(function(){ $('.form-inline').find('*').prop('disabled', true) })
    $('#tabs ul li a').removeClass('active');
    $('#tabs ul li a[href="#'+ this.get('activeTab') +'"]').addClass('active');
    $('.card-body .table').addClass('table-sm table-hover');
    var height = $('#tables').height();
    var tables =  $('.table-wrapper');
    var card = $('.card').outerHeight(true);
    for(var i=0; i < tables.length; i++){
      $(`#${tables[i].id}`).height(height - tables.length*card );
    }
  },

  actions: {
    close(){
      this.set('selectedTask', null);
      this.set('taskModal', false);
    },
    activateTab(tab){
      this.get('activateTab')(tab);
      return tab;
    }
  }
});