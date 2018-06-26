= bs-modal class=componentCssClassName open=createModal backdropClose=true fade=fade onHidden=(action (mut createModal) false) as |modal|
  modal.header
    h4.modal-title.vcentered
      i.mdi.mdi-plus.__icon
      if isSaveAS
        span.__text: t 'workflows.save-as-modal.title'
      else
        span.__text: t 'workflows.create-new-modal.title'
  modal.body
    form
      .form-group.row
        label.col-12.col-md-3.col-form-label #{t 'forms.name.label'}:
        .col-12.col-md-9
          = input .form-control type="text" required=true placeholder=(t 'workflows.create-new-modal.name') value=name
      .form-group.row
        label.col-12.col-md-3.col-form-label #{t 'forms.description.label'}:
        .col-12.col-md-9
          = textarea .form-control type="text" rows='6' maxlength="1600" placeholder=(t 'workflows.create-new-modal.description') value=description
      .form-group.row
        label.col-12.col-md-3.col-form-label #{t 'forms.platform.label'}:
        .col-12.col-md-9
          select.form-control onchange={action (mut platform) value='target.value'} disabled={isSaveAs}
            each platforms as |platform|
              option value={platform.id}
                = platform.name
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
  modal.footer
    if isSaveAs
      = bs-button id='saveAs' onClick=(action 'saveAs')
        t 'workflows.save-as-modal.create'
    else
      = bs-button id='create' onClick=(action 'createNew')
        t 'workflows.create-new-modal.create'
    = bs-button id='cancel' onClick=(action (mut createModal) false)
      t 'workflows.create-new-modal.cancel'
