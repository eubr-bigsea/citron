import $ from 'jquery';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'nav',

  didInsertElement(){
    $('#tasks-list').metisMenu();
    this.send('collapseAll');
  },

  actions: {
    collapseAll(){
      $('#tasks-list li').toggleClass('active')
      $('#tasks-list ul').toggleClass('collapse in')
      $('#tasks-list ul').height('auto')
    },
    openModal(task, tab){
      this.get('selectTask')(task, tab);
    },
  },
});
