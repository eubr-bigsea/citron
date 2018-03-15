= bs-modal class=componentCssClassName open=deleteModal backdropClose=true fade=fade onHidden=(action (mut deleteModal) false) as |modal|
  modal.header
    h4.modal-title.vcentered.__status class=status
      i.__icon.mdi.mdi-alert
      span.__text: t 'datasources.delete-modal.title' count=count datasource=datasource
  modal.body
    .wrapper
      h5: = t 'datasources.delete-modal.message' count=count datasource=datasource
  modal.footer
    = bs-button onClick=deleteDatasource class="btn-danger"
      t 'datasources.delete-modal.delete-btn'
    = bs-button onClick=(action (mut deleteModal) false)
      t 'datasources.delete-modal.cancel'
