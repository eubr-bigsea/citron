= bs-modal class=componentCssClassName open=reportModal backdropClose=true fade=fade onHidden=(action (mut reportModal) false) as |modal|
  modal.header
    h4.modal-title.vcentered.__status class=status
      i.__icon
      span.__text: t 'modal.report.title'
  modal.body
      h4: = message
  modal.footer
    = bs-button onClick=(action (mut reportModal) false)
      t 'modal.default.submitButton'
