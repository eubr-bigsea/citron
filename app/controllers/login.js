import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),

  emailFormGroup: 'form-group',
  invalidEmailErrorMessage: null,
  passwordFormGroup: 'form-group',
  invalidPasswordErrorMessage: null,

  actions: {
    authenticate(){
      this.setProperties({
        mailFormGroup: 'form-group',
        invalidEmailErrorMessage: null,
        passwordFormGroup: 'form-group',
        invalidPasswordErrorMessage: null,
      });

      let { email, password } = this.getProperties('email','password');
      this.get('session').authenticate('authenticator:devise', email, password)
        .catch((reason)=>{
          if(reason.errors){
            this.set('invalidPasswordErrorMessage', reason.errors[0] || reason);
            this.set('passwordFormGroup', 'form-group has-error');
            this.set('invalidEmailErrorMessage', reason.errors[0] || reason);
            this.set('emailFormGroup', 'form-group has-error');
          }
        });
    },
  },
});
