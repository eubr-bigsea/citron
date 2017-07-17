import Ember from 'ember';

export default Ember.Component.extend({
  filterText: null,
  allUsers: Ember.A(),
  userSelected: null,

  permissions:  [{"user":{"id":"4","email":"souzagonc@gmail.com","first_name":"Matheus","last_name":"Gonçalves"},"permission":"READ"},{"user":{"id":"1","email":"waltersf@gmail.com","first_name":"Walter","last_name":"Santos"},"permission":"MANAGE"},{"user":{"id":"2","email":"guimalufb@gmail.com","first_name":"guimaluf","last_name":"balzana"},"permission":"WRITE"}],

  init(){
    this._super(...arguments);
    //    this.addObserver('filterText', this, 'filterDidChange');
    this.addObserver('userSelected', this, 'usersDidChange');
  },
  userDidChange(){
    console.log(this.get('userSelected'));
  },
  filterDidChange(){
    var filter = this.get('filterText').toString().toLowerCase();
    var filterUsers = this.get('users').filter(function(item){
      return item.user.first_name.toString().toLowerCase().indexOf(filter) !== -1 || item.user.last_name.toString().toLowerCase().indexOf(filter) !== -1 || item.user.email.toString().toLowerCase().indexOf(filter) !== -1
    })
    this.set('filterUsers', filterUsers);
  },
  didReceiveAttrs(){
    this._super(...arguments);
    this.set('allUsers', Ember.A());
    let users = this.get('users');
    let allUsers = this.get('allUsers');
    let permissions = this.get('permissions');
    users.forEach((user) => {
      allUsers.pushObject(user);
    })
    permissions.forEach(function(item){
      allUsers.removeObject(allUsers.findBy('id', item.user.id))
    });
  },


  didInsertElementi(){
    var users =  this.get('users');
    this.get('allUsers').forEach((user) => {
      var shared = false;
      this.get('permissions').forEach(function(perm) {
        if( user.get('id') === String(perm.user_id) ){
          shared = true;
        }
      });
      if (!shared){
        var elem = Ember.Object.create({
          user: {
            id: user.get('id'),
            email: user.get('email'),
            first_name: user.get('firstName'),
            last_name: user.get('lastName'),
          },
          permission: 'READ',
        });
        users.pushObject(elem);
      }
    });
    this.set('filterUsers', users);
  },

  actions: {
    selectUser(user){
      this.set('permissions',  [{"user":{"id":"1","email":"waltersf@gmail.com","first_name":"Walter","last_name":"Santos"},"permission":"MANAGE"},{"user":{"id":"2","email":"guimalufb@gmail.com","first_name":"guimaluf","last_name":"balzana"},"permission":"WRITE"}])
      var ma = this.get('users').findBy('id', '4');
      this.get('allUsers').pushObject(ma)

      this.set('selectedUser', user);
      $('.list-group-item').removeClass('active');
      $(`#user-${user.id}`).toggleClass('active');
    },
    removePermission(item){
      this.get('users').addObject(item);
      this.get('filterUsers').addObject(item);
      this.get('permissions').removeObject(item);
      this.get('filterDidChange')();
    },
    addPermission(item){
      this.get('permissions').addObject(item)
      this.get('users').removeObject(item);
      this.get('filterUsers').removeObject(item);
      this.get('filterDidChange')();
    },
  },
});
