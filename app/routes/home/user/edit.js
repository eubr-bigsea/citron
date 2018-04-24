import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Route.extend(AuthenticatedRouteMixin,{
  i18n: service(),
  session: service(),

  model(params){
    this._super(...arguments);
    return this.store.findRecord('user', params.id);
  },

  setupController(controller, model){
    this._super(...arguments);
    controller.set('locales', this.get('i18n.locales'));
    controller.set('changePassword', false);
    controller.set('modal', false);
    controller.set('firstName', model.get('firstName'));
    controller.set('lastName', model.get('lastName'));
  },

  actions: {
    save(){
      $('span.has-error').removeClass('invisible');
      this.set('currentModel.firstName', this.controller.get('firstName'));
      this.set('currentModel.lastName', this.controller.get('lastName'));
      var model = this.get('currentModel');
      return model.save().then(
        ()=>{
          this.set('i18n.locale', model.get('locale'));
          this.get('session').set('data.locale', model.get('locale'));
          this.controller.toggleProperty('modal');
        }).catch(() => {
          var errors = model.get('errors').toArray();
          for(var i=0, len=errors.length; i<len; i++){
            $(`#${errors[i].attribute}`).addClass('has-error');
          }
        }
        );
    },

    toggleChangePassword(){
      var model = this.get('currentModel');
      model.set('currentPassword', null);
      model.set('password', null);
      model.set('passwordConfirmation', null);
      this.controller.toggleProperty('changePassword');
    },

    togglePassword(id){
      var input = $('#' + id + ' input')[0];
      var button = $('#' + id + ' a i');

      if(input.type === 'password'){
        button.removeClass('fa-eye')
        button.addClass('fa-eye-slash')
        input.type = 'text';
      } else {
        button.removeClass('fa-eye-slash')
        button.addClass('fa-eye')
        input.type = 'password';
      }
    },

    removeError(id){
      $('#' + id ).removeClass('has-error');
      $('#' + id + ' span.has-error').addClass('invisible');
    },

    transitionToHome(){
      this.transitionTo('home');
    }
  }
});
