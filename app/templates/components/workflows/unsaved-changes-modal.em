= bs-modal class=componentCssClassName open=unsavedModal backdropClose=true fade=fade onHide=cancelTransition as |modal|
  modal.header
    h4.modal-title.vcentered
      i.__icon
      span.__text: t 'workflows.unsaved-changes-modal.title'
  modal.body
    .wrapper
      h5: t 'workflows.unsaved-changes-modal.message'
  modal.footer
    = bs-button onClick=confirmTransition
      t 'modal.default.submitButton'
    = bs-button onClick=cancelTransition
      t 'cancel'

