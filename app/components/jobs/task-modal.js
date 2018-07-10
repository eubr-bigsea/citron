import Component from '@ember/component';
import $ from 'jquery';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  i18n: service(),

  locale: computed('i18n', function(){ return this.get('i18n.locale')} ),

  didReceiveAttrs() {
    this._super(...arguments);

    if(!this.get('viz')) {
      this.set('visualizationIsVisible', false);
    }
  },

  didRender(){
    $('a[href$="#params"]').click(function(){ $('.form-inline').find('*').prop('disabled', true) })
    $('#tabs ul li a').removeClass('active');
    $('#tabs ul li a[href="#'+ this.get('activeTab') +'"]').addClass('active');
    $('.card-body .table').addClass('table-sm table-hover');
    var height = $('.tab-content').height();
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
      this.set('viz', null);
    },

    activateTab(tab){
      this.get('activateTab')(tab);
      return tab;
    },

    updateVis() {
      const selectedTask = this.get('selectedTask');

      if(selectedTask && selectedTask.result) {
        this.set('htmlContent', selectedTask.result.data.html);
        this.set('viz', {
          component: `visualizations/${selectedTask.operation.slug}`
          .replace('bar-chart', 'vertical-bar-chart')
          .replace('summary-statistics', 'table-visualization')
        });

        this.set('visualizationIsVisible', true);
      }
    }
  }
});
