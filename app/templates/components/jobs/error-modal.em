= bs-modal class=componentCssClassName open=errorModal backdropClose=true fade=fade onHidden=(action (mut errorModal) false) as |modal|
  modal.header
    h4.modal-title.vcentered.__status class=content.status
      i.__icon
      span.__text: t 'modal.error.title'
  modal.body
      h4: = content.message
  modal.footer
    = bs-button onClick=(action (mut errorModal) false)
      if content.cancelButton
        t content.cancelButton
      else
        t 'modal.default.cancelButton'
