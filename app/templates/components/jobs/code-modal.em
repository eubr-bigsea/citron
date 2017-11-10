= bs-modal class=componentCssClassName open=modalCode backdropClose=true fade=fade onHidden=(action (mut modalCode) false) as |modal|
  modal.header
    h4.modal-title
      if content.title
        t content.title jobId=content.jobId
      else
        t 'modal.default.title'
  modal.body
    if content.code
      pre: code: == content.code
    else
      h4: t 'modal.code.loading'
  modal.footer
    = bs-button onClick=(action (mut modalCode) false)
      if content.cancelButton
        t content.cancelButton
      else
        t 'modal.default.cancelButton'
