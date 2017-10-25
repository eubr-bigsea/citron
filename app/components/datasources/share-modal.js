import { A } from '@ember/array';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import config from '../../config/environment';
import $ from 'jquery';

export default Component.extend({
  store: service(),
  filterText: null,
  allUsers: A(),
  itemSelected: null,
  userID: null,


  init(){
    this._super(...arguments);
    this.addObserver('filterText', this, 'filterDidChange');
  },
  filterDidChange(){
    var filter = this.get('filterText').toString().toLowerCase();
    var filterUsers = this.get('allUsers').filter(function(user){
      return user.get('name').toLowerCase().substring(0, filter.length) === filter
    })
    this.set('filterUsers', filterUsers);
  },
  didReceiveAttrs(){
    this._super(...arguments);
    this.set('allUsers', A());
    let users = this.get('users');
    let allUsers = this.get('allUsers');
    let permissions = this.get('permissions');
    users.forEach((user) => {
      allUsers.addObject(user);
    })
    if(permissions){
      permissions.forEach(function(item){
        allUsers.removeObject(allUsers.findBy('id', String(item.user_id)));
      });
    }
    this.set('filterUsers', allUsers);
  },


  actions: {
    changePermission(permission, newPermission){
      let datasourceId = this.get('datasource.id');
      $.ajax({
        type: 'POST',
        url:`${config.limonero}/datasources/${datasourceId}/permission/${permission.user_id}`,
        contentType:"application/json",
        dataType: 'json',
        data: JSON.stringify({
          permission: newPermission,
          user_name: permission.user_name,
          user_login: permission.user_login
        })
      });
    },
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
        let datasourceId = this.get('datasource.id');
        $.ajax({
          url:`${config.limonero}/datasources/${datasourceId}/permission/${userId}`,
          type: 'DELETE',
          success: function(){
            filterUsers.addObject(user);
            allUsers.addObject(user);
            permissions.removeObject(permissions.findBy('user_id', userId));
          }
        });
        this.set('userSelectedId', '');
        this.set('userSelected', '');
      }

    },
    addPermission(){
      let userId = this.get('userSelectedId');
      let datasourceId = this.get('datasource.id');
      let permissions = this.get('permissions');
      if(userId && !permissions.findBy('user_id', userId)){
        let user = this.get('userSelected');
        let allUsers = this.get('allUsers');
        let filterUsers = this.get('filterUsers');
        filterUsers.removeObject(filterUsers.findBy('id',userId));
        allUsers.removeObject(allUsers.findBy('id',userId));
        var permission = {
          permission: 'READ',
          user_name: user.get('name'),
          user_login: user.get('email'),
          user_id: userId
        };
        $.ajax({
          type: 'POST',
          url:`${config.limonero}/datasources/${datasourceId}/permission/${userId}`,
          contentType:"application/json",
          dataType: 'json',
          data: JSON.stringify(permission),
          success: function(){
            permissions.addObject(permission);
          }
        });
        this.set('userSelectedId', '');
        this.set('userSelected', '');
      }
    },
    hideModal(){
      this.set('shareModal', false);
    },
  },
});
