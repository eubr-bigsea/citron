= bs-modal class=componentCssClassName open=importModal backdropClose=true fade=fade onHidden=(action (mut importModal) false) as |modal|
  modal.header
    h4.modal-title.vcentered
      i.mdi.mdi-plus.__icon
      span.__text: t 'workflows.import-modal.title'
  modal.body
    if file
      form
        .form-group.row
          label.col-12.col-md-3.col-form-label #{t 'forms.name.label'}:
          .col-12.col-md-9
            = input .form-control type="text" required=true placeholder=(t 'workflows.create-new-modal.name') value=file.name
        .form-group.row
          label.col-12.col-md-3.col-form-label #{t 'forms.description.label'}:
          .col-12.col-md-9
            = textarea .form-control type="text" rows='6' maxlength="1600" placeholder=(t 'workflows.create-new-modal.description') value=file.description
        .form-group.row
          label.col-12.col-md-3.col-form-label #{t 'forms.platform.label'}:
          .col-12.col-md-9
            = input .form-control type="text" value=file.platform.name disabled=true
        .form-group.row
          .col-12.col-md-9.offset-md-3
            label.btn.btn-secondary.check class={isPublic} click={action 'toggleIsPublic'}
              i.mdi.mdi-check
            span.label title={t 'forms.public.helper'} #{t 'forms.public.label'}
        .form-group.row
          label.col-12.col-md-3.col-form-label #{t 'forms.images.label'}:
          .col-12.col-md-9
            .images-container
              each images as |image|
                img.logo id={image.id} src='/assets/images/#{image.name}' click={action 'selectImage' image}
    else if hasError
      .alert.alert-danger
        p: = t 'workflow.upload-modal.error-message' fileName=file.fileName
        p: = hasError.message
    else
      = file-picker fileLoaded="fileLoaded" readAs='readAsText'
        h5.dropzone-message
          i.__icon.mdi.mdi-cloud-upload
          = t 'datasources.upload-modal.dropzone-message'
        button.btn.btn-secondary#browseButton
          = t 'datasources.upload-modal.browse-button'
          i.mdi.mdi-upload



  modal.footer
    if file
      = bs-button id='create' onClick=(action 'createNew') disabled=(eq file.name '')
        t 'workflows.import-modal.create'
    = bs-button id='cancel' onClick=(action (mut importModal) false)
      t 'workflows.create-new-modal.cancel'
