import Controller from '@ember/controller';

export default Controller.extend({
  createModal: false,

  actions: {
    showCreateModal(){
      this.set('createModal', true);
    },
    transitionToDraw(id, queryParams){
      this.transitionToRoute('home.workflows.draw', id, queryParams);
    },
    deleteWorkflow(){
    },
    createWorkflow(){

    }
  }
});
