= bs-modal class=componentCssClassName open=alertModal backdropClose=true fade=fade onHidden=(action (mut alertModal) false) as |modal|
  modal.header
    h4.modal-title.vcentered
      i.__icon.mdi.mdi-alert-circle-outline
      span.__text: = t alertContent.title
  modal.body
    .wrapper
      h4: = t alertContent.message
      if alertContent.errorMessage
        h5.alert.alert-danger: = alertContent.errorMessage
  modal.footer
    = bs-button onClick=(action 'closeModal')
      t 'modal.default.submitButton'
