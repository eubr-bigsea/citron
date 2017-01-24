import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement(){
    Ember.$('.image-container').on('click',function(e){
      e.preventDefault();
      Ember.$('.image-container').removeClass('active');
      Ember.$('.image-container').parents('.image-container').removeClass('active');
      Ember.$(this).addClass('active');
      Ember.$(this).parents('.image-container').addClass('main');
    });
  }
});
