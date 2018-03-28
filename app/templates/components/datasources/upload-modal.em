= bs-modal class=componentCssClassName open=uploadModal backdropClose=true fade=fade onHidden=(action 'closeUploadModal') as |modal|
  modal.header
    h4.modal-title.vcentered.__status class=status
      i.__icon.mdi.mdi-upload
      span.__text: t 'datasources.upload-modal.title'
  modal.body
    if file
      if file.isFinished
        .alert.alert-success
          p: = t 'datasources.upload-modal.success-message' fileName=file.fileName
      else if file.hasError
        .alert.alert-danger
          p: = t 'datasources.upload-modal.error-message' fileName=file.fileName
          p: = file.errorMessage
      else
        = datasources/upload-progress resumable=resumable file=file progress=progress status=file.status
    else
      = datasources/upload-zone resumable=resumable
  modal.footer
    if (or file.isFinished file.hasError)
      button.btn.btn-secondary.upload-more click={action 'setFile' null}
        = t 'datasources.upload-modal.upload-more'
    = bs-button .btn-danger onClick=(action 'closeUploadModal')
      t 'datasources.upload-modal.cancel'
