.__dashboards__index
  .container-fluid.menu
    .row.centered
      .col-12.col-md-7
       .title-block.pull-left
         h3.title
           i.fa.fa-flask
           =t 'dashboards.title'
         p.title-description: =t 'dashboards.description'
      .col-12.col-md-5
        //.search-block.pull-right
          form.form-inline onsubmit='return false'
            .input-group
              =input class='form-control' placeholder=(t 'dashboards.searchFor') value=name insert-newline=(action 'search')
              span.input-group-btn
                button.btn.btn-secondary#submit type='button'
                  i.fa.fa-search
  .container-fluid.model: .row: .col-12
    = dashboards/dashboards-table toggleSelect=(action 'toggleSelect') sortBy=(action 'sortBy') sortFromDropdown=(action 'sortFromDropdown') selectSingle=(action 'selectSingle') toggleDeleteModal=(action 'toggleDeleteModal') selectAll=selectAll timeProperties=timeProperties dashboards=model loadNext=(action 'loadNext') locale=locale sort=sort asc=asc
    //not implemented yet on caipirinha
    //= dashboards/delete-modal deleteModal=deleteModal deleteDashboard=(action 'deleteDashboard') dashboard=toDelete.firstObject dashboards=toDelete
= outlet
