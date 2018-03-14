.__worflows__index
  .container-fluid.menu
    .row.centered
      .col-12.col-md-7
       .title-block.pull-left
         h3.title
           i.fa.fa-flask
           =t 'workflows.title'
         p.title-description: =t 'workflows.description'
      .col-12.col-md-5
        .search-block.pull-right
          form.form-inline onsubmit='return false'
            .input-group
              =input class='form-control' placeholder=(t 'workflows.searchFor') value=name key-up=(action 'search')
              span.input-group-btn
                button.btn.btn-secondary#submit type='button'
                  i.fa.fa-search
  .container-fluid.model: .row: .col-12
    = workflows/workflows-table toggleSelect=(action 'toggleSelect') sortBy=(action 'sortBy') sortFromDropdown=(action 'sortFromDropdown') selectSingle=(action 'selectSingle') toggleDeleteModal=(action 'toggleDeleteModal') selectAll=selectAll timeProperties=timeProperties workflows=model.workflows loadNext=(action 'loadNext') locale=locale sort=sort asc=asc
  = workflows/alert-modal title=alertContent.title message=alertContent.message alertModal=alertModal alertCallback=alertCallback
  = workflows/delete-modal deleteModal=deleteModal deleteWorkflow=(action 'deleteWorkflow') workflow=toDelete.firstObject workflows=toDelete
  button.btn.btn-default.btn-circle
    if deleteButton
      i.mdi.mdi-delete click={action 'toggleDeleteMultipleModal'}
    else if createModal
      i.mdi.mdi-dots-horizontal
    else
      i.mdi.mdi-plus click={action 'toggleCreateModal'}
= workflows/create-new-modal createModal=createModal platforms=model.platforms images=model.images transitionToDraw=(action 'transitionToDraw')
= outlet
