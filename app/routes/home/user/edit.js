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

  setupController(controller){
    this._super(...arguments);
    controller.set('locales', this.get('i18n.locales'));
    controller.set('changePassword', false);
  },

  actions: {
    save(){
      var model = this.get('currentModel');
      return model.save().then(
        ()=>{
          this.set('i18n.locale', model.get('locale'));
          this.get('session').set('data.locale', model.get('locale'));
          this.transitionTo('home');
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
      var button = $('#' + id + ' a')[0];

      if(input.type === 'password'){
        button.text = this.get('i18n').t('forms.hide');
        input.type = 'text';
      } else {
        button.text= this.get('i18n').t('forms.show');
        input.type = 'password';
      }
    }
  }
});
