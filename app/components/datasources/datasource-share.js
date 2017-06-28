import Ember from 'ember';

export default Ember.Component.extend({
  users: null,
  filterText: null,

  init(){
    this._super(...arguments);
    this.set('users', Ember.A());
    this.addObserver('filterText', this, 'filterDidChange');
    this.addObserver('users', this, 'usersDidChange');
  },
  filterDidChange(){
    var filter = this.get('filterText').toString().toLowerCase();
    var filterUsers = this.get('users').filter(function(item){
      return item.user.first_name.toString().toLowerCase().indexOf(filter) !== -1 || item.user.last_name.toString().toLowerCase().indexOf(filter) !== -1 || item.user.email.toString().toLowerCase().indexOf(filter) !== -1
    })
    this.set('filterUsers', filterUsers);
  },


  didInsertElement(){
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
