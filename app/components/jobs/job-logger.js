import $ from 'jquery';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'nav',

  didInsertElement(){
    $('#tasks-list').metisMenu();
    $('#tasks-list li').addClass('active')
    $('#tasks-list ul').addClass('collapse in')
  },

  actions: {
    openModal(task, tab){
      this.set('selectedTask', task);
      this.set('activeTab', tab);
      this.set('taskModal', true);
    },
  },
});
