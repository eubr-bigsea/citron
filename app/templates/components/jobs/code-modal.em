= bs-modal class=componentCssClassName open=codeModal backdropClose=true fade=fade onHidden=(action (mut modalCode) false) as |modal|
  modal.header
    h4.modal-title
      t 'modal.code.title' jobId=jobId
  modal.body
    if code
      pre: code: == code
    else
      h4.vcentered: t 'modal.code.loading'
  modal.footer
    = bs-button onClick=(action (mut codeModal) false)
      t 'modal.default.submitButton'
