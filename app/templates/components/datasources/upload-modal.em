= bs-modal class=componentCssClassName open=uploadModal backdropClose=true fade=fade onHidden=(action 'closeUploadModal') as |modal|
  modal.header
    h4.modal-title.vcentered.__status class=status
      i.__icon.mdi.mdi-upload
      span.__text: t 'datasources.upload-modal.title'
  modal.body
    .form-group
      p.title
        span.label title="datasources.upload-modal.storage.label"
          = t 'datasources.upload-modal.storage.label'
      .form-field
        select class="form-control" onchange={action 'setStorage' value='target.value'}
          option
          each storages as |opt|
            option selected={eq storage.id opt.id} value=opt.id
              = opt.name 
    if (eq storage.type 'JDBC')
      .form-group
        p.title
          span.label title="datasources.upload-modal.datasource.name"
            = t 'datasources.upload-modal.datasource.name'
        .form-field
          = textarea .sql-input value=name
      .form-group
        p.title
          span.label title="datasources.upload-modal.datasource.url"
            = t 'datasources.upload-modal.datasource.url'
        .form-field
          = textarea .sql-input value=url
      .form-group
        p.title
          span.label title="datasources.upload-modal.datasource.command"
            = t 'datasources.upload-modal.datasource.command'
        .form-field
          = textarea .sql-input value=command
          
      .form-group
        label.btn.btn-secondary.check class={isPublic} click={action 'toggleIsPublic'}
          i.mdi.mdi-check
        span.label title={t 'forms.public.helper'} #{t 'forms.public.label'}

      .errorMessage
        = errorMessage
    else if (not-eq storage.type undefined )
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
    if (eq storage.type 'JDBC')
      button.btn.btn-secondary.upload-more click={action 'createJDBC' null}
        = t 'datasources.upload-modal.create'
    if (or file.isFinished file.hasError)
      button.btn.btn-secondary.upload-more click={action 'setFile' null}
        = t 'datasources.upload-modal.upload-more'
    = bs-button .btn-danger onClick=(action 'closeUploadModal')
      if file.isFinished
        t 'datasources.upload-modal.exit'
      else
        t 'datasources.upload-modal.cancel'
