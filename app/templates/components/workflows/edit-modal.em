= bs-modal class=componentCssClassName open=editModal backdropClose=true fade=fade onHidden=(action (mut editModal) false) as |modal|
  modal.header
    h4.modal-title.vcentered
      i.mdi.mdi-plus.__icon
      span.__text: t 'workflows.edit-modal.title'
  modal.body
    form
      .form-group.row
        label.col-12.col-md-3.col-form-label #{t 'forms.name.label'}:
        .col-12.col-md-9
          = input .form-control type="text" required=true placeholder=(t 'workflows.edit-modal.name') value=workflow.name
      .form-group.row
        label.col-12.col-md-3.col-form-label #{t 'forms.description.label'}:
        .col-12.col-md-9
          = textarea .form-control type="text" rows='6' maxlength="1600" placeholder=(t 'workflows.edit-modal.description') value=workflow.description
      .form-group.row
        .col-12.col-md-9.offset-md-3
          label.btn.btn-secondary.check class={workflow.is_public} click={action 'toggleIsPublic'}
            i.mdi.mdi-check
          span.label title={t 'forms.public.helper'} #{t 'forms.public.label'}
      .form-group.row
        label.col-12.col-md-3.col-form-label #{t 'forms.images.label'}:
        .col-12.col-md-9
          .images-container
            each images as |image|
              img.logo id={image.id} src='/assets/images/#{image.name}' click={action 'selectImage' image}
  modal.footer
    = bs-button id='edit' onClick=(action 'save')
      t 'workflows.edit-modal.save'
    = bs-button id='cancel' onClick=(action (mut editModal) false)
      t 'workflows.edit-modal.cancel'
