= bs-modal class=componentCssClassName open=deleteModal backdropClose=true fade=fade onHidden=(action (mut deleteModal) false) as |modal|
  modal.header
    h4.modal-title.vcentered.__status class=status
      i.__icon.mdi.mdi-alert
      span.__text: t 'jobs.delete-modal.title' count=count job=job
  modal.body
    .wrapper
      h5: = t 'jobs.delete-modal.message' count=count job=job
  modal.footer
    = bs-button onClick=deleteJob class="btn-danger"
      t 'jobs.delete-modal.delete-btn'
    = bs-button onClick=(action (mut deleteModal) false)
      t 'jobs.delete-modal.cancel'
