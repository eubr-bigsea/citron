import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  store: service(),
  filterText: null,
  allUsers: Ember.A(),
  itemSelected: null,


  init(){
    this._super(...arguments);
    this.addObserver('filterText', this, 'filterDidChange');
  },
  filterDidChange(){
    var filter = this.get('filterText').toString().toLowerCase();
    var filterUsers = this.get('allUsers').filter(function(user){
      return user.get('name').toString().toLowerCase().indexOf(filter) !== -1
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
      allUsers.addObject(user);
    })
    if(permissions){
      permissions.forEach(function(item){
        allUsers.removeObject(allUsers.findBy('id', item.user.id))
      });
    }
    this.set('filterUsers', allUsers);
  },

  actions: {
    selectUser(userId){
      $('.list-group-item').removeClass('active');
      if(this.get('userSelectedId') !== userId){
        this.set('userSelectedId', userId);
        let user = this.get('store').findRecord('user', userId);
        this.set('userSelected', user);
        $(`#user-${userId}`).toggleClass('active');
      } else {
        this.set(this.set('userSelectedId', ''));
      }
    },
    removePermission(){
      let userId = this.get('userSelectedId');
      if(userId){
        let user = this.get('userSelected');
        let allUsers = this.get('allUsers');
        let permissions = this.get('permissions');
        let filterUsers = this.get('filterUsers');
        filterUsers.addObject(user);
        allUsers.addObject(user);
        permissions.removeObject(permissions.findBy('user.id', userId));
        this.set('userSelectedId', '');
        this.set('userSelected', '');
      }

    },
    addPermission(){
      let userId = this.get('userSelectedId');
      let permissions = this.get('permissions');
      if(userId && !permissions.findBy('user.id', userId)){
        let user = this.get('userSelected');
        let allUsers = this.get('allUsers');
        let filterUsers = this.get('filterUsers');
        filterUsers.removeObject(filterUsers.findBy('id',userId));
        allUsers.removeObject(allUsers.findBy('id',userId));
        var permission = Ember.Object.create({
          user: {
            id: user.get('id'),
            email: user.get('email'),
            first_name: user.get('firstName'),
            last_name: user.get('lastName'),
          },
          permission: 'READ',
        });
        permissions.addObject(permission);
        this.set('userSelectedId', '');
        this.set('userSelected', '');
      }
    },
    hideModal(){
      this.get('datasource').save();
      this.set('shareModal', false);
    },
    save(){
      this.get('datasource').save();
    },
  },
});
