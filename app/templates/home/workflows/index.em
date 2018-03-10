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
              =input class='form-control' placeholder=(t 'workflows.searchFor')
              span.input-group-btn
                button.btn.btn-secundary#submit type='button'
                  i.fa.fa-search
  = workflows/large-table id="large-table-workflows" class="container-fluid" workflows=model.workflows locale=locale
  = workflows/alert-modal title=alertContent.title message=alertContent.message alertModal=alertModal alertCallback=alertCallback
  = workflows/delete-modal deleteModal=deleteModal deleteWorkflow=(action 'deleteWorkflow') workflow=model.workflow
  button.btn.btn-default.btn-circle click={action 'showCreateModal'}
    if selectedWorkflows
      i.mdi.mdi-delete
    else if createModal
      i.mdi.mdi-dots-horizontal
    else
      i.mdi.mdi-plus
= workflows/create-new-modal createModal=createModal platforms=model.platforms images=model.images transitionToDraw=(action 'transitionToDraw')
= outlet
