.__datasources__index
  .container-fluid.menu
    .row.centered
      .col-12.col-md-7
       .title-block.pull-left
         h3.title
           i.fa.fa-flask
           =t 'datasources.title'
         p.title-description: =t 'datasources.description'
      .col-12.col-md-5
       // .search-block.pull-right
          form.form-inline onsubmit='return false'
            .input-group
              =input class='form-control' placeholder=(t 'datasources.searchFor') value=name insert-newline=(action 'search')
              span.input-group-btn
                button.btn.btn-secondary#submit type='button'
                  i.fa.fa-search
  .container-fluid.model: .row: .col-12
    = datasources/datasources-table toggleSelect=(action 'toggleSelect') sortBy=(action 'sortBy') sortFromDropdown=(action 'sortFromDropdown') selectSingle=(action 'selectSingle') toggleDeleteModal=(action 'toggleDeleteModal') selectAll=selectAll timeProperties=timeProperties datasources=model.datasources loadNext=(action 'loadNext') locale=locale sort=sort asc=asc
  = datasources/delete-modal deleteModal=deleteModal deleteDatasource=(action 'deleteDatasource') datasource=toDelete.firstObject datasources=toDelete
  = datasources/upload-modal uploadModal=uploadModal reloadModel=(route-action 'reloadModel') storages=model.storages
  //= datasources/share-modal shareModal=shareModal datasource=shareDatasource users=users permissions=shareDatasource.permissions
  if deleteButton
    button.btn.btn-default.btn-circle click={action 'toggleDeleteMultipleModal'}
      i.mdi.mdi-delete
  else if uploadModal
    button.btn.btn-default.btn-circle
      i.mdi.mdi-dots-horizontal
  else
    button.btn.btn-default.btn-circle click={action 'toggleUploadModal'}
      i.mdi.mdi-upload
= outlet
