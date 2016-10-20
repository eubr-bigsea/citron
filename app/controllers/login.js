import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),

  emailFormGroup: 'form-group',
  invalidEmailErrorMessage: null,
  passwordFormGroup: 'form-group',
  invalidPasswordErrorMessage: null,

  actions: {
    login: function() {
      this.setProperties({
        mailFormGroup: 'form-group',
        invalidEmailErrorMessage: null,
        passwordFormGroup: 'form-group',
        invalidPasswordErrorMessage: null,
      });

      let credentials = this.getProperties('email', 'password', 'remember');
      this.get('session').authenticate('authenticator:jwt', credentials)
        .catch((reason)=>{
          if ( reason.code === 1 ){
            this.set('passwordFormGroup', 'form-group has-error');
            this.set('invalidPasswordErrorMessage', reason.errorMessage);
          } else if ( reason.code === 2){
            this.set('emailFormGroup', 'form-group has-error');
            this.set('invalidEmailErrorMessage', reason.errorMessage);
          }
        });
    },
  },
});
