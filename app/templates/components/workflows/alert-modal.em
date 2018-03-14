= bs-modal class=componentCssClassName open=alertModal backdropClose=true fade=fade onHidden=(action (mut alertModal) false) as |modal|
  modal.header
    h4.modal-title.vcentered
      i.__icon
      span.__text: t title
  modal.body
    .wrapper
      h5: t message
  modal.footer
    = bs-button onClick=(action 'closeModal') class="btn-success"
      t 'modal.default.submitButton'

