.container-fluid.__user__edit
  .row
    .col-xs-12.title-block
      h4.title
        t 'forms.yourProfile'
        strong: model.firstName
    .col-xs-12.form-block
      .form-group.row#first_name
        label.col-xs-2.col-form-label for='firstName'
          = concat (t 'forms.firstName.label') ":"
        .col-xs-10
          = input#firstName value=model.firstName name='firstName' type='text' placeholder=(t 'forms.firstName.placeholder')
          each model.errors.firstName as |error|
            span.has-error : = error.message
      .form-group.row#last_name
        label.col-xs-2.col-form-label for='lastName'
          = concat (t 'forms.lastName.label') ":"
        .col-xs-10
         = input#lastName name='lastName' type='text' placeholder=(t 'forms.lastName.placeholder') value=model.lastName
         each model.errors.lastName as |error|
           span.has-error : = error.message
      .form-group.row
        label.col-xs-2.col-form-label for='email'
          = concat (t 'forms.email.label') ":"
        .col-xs-10
         = input#email name='email' readonly='readonly' type='text' placeholder=(t 'forms.email.placeholder') value=model.email
      .form-group.row#locales
        label.col-xs-2.col-form-label for='locales'
          =concat (t 'forms.locale.label') ":"
        .col-xs-10
         select name='locales' onchange={action (mut model.locale) value="target.value"}
           each locales as |locale|
             option value=locale selected={eq locale model.locale}
               = t locale
      if changePassword
        .form-group.row#current_password
          label.col-xs-2.col-form-label for='currentPassword'
            = concat (t 'forms.currentPassword.label') ":"
          .col-xs-10
           = input class='password' type='password' placeholder=(t 'forms.password.placeholder') value=model.currentPassword
           a.btn.btn-secondary.toggle-password onclick={route-action 'togglePassword' 'current_password'}
              i.fa.fa-eye
           each model.errors.current_password as |error|
             span.has-error
               = error.message
        .form-group.row#password
          label.col-xs-2.col-form-label for='password'
            = concat (t 'forms.newPassword.label') ":"
          .col-xs-10
            = input class='password' type='password' placeholder=(t 'forms.password.placeholder') value=model.password
            a.btn.btn-secondary.toggle-password onclick={route-action 'togglePassword' 'password'}
              i.fa.fa-eye
            each model.errors.password as |error|
              span.has-error
                = error.message
        .form-group.row#password_confirmation
          label.col-xs-2.col-form-label for='newPasswordConfirmation'
            = concat (t 'forms.newPasswordConfirmation.label') ":"
          .col-xs-10
            = input class='password' type='password' placeholder=(t 'forms.password.placeholder') value=model.passwordConfirmation focusIn=(route-action 'removeError' 'password_confirmation')
            a.btn.btn-secondary.toggle-password onclick={route-action 'togglePassword' 'password_confirmation'}
              i.fa.fa-eye
            each model.errors.password_confirmation as |error|
              span.has-error
                = error.message
      .form-group.row.buttons
        .col-xs-12.offset-sm-1
          button.btn.btn-primary.confirm onclick={route-action 'save'}
            = t 'forms.save'
          = link-to 'home' class='btn btn-danger'
            = t 'forms.cancel'
          if (not changePassword)
            button class="btn btn-primary btn-info" onclick={route-action 'toggleChangePassword'}
              = t 'forms.changePassword'
= bs-modal open=modal class='__user__edit profile-modal' backdropClose=true fade=fade onHidden=(action (mut modal) false) as |modal|
  modal.header
    h4.modal-title
      t 'modal.profile.title'
  modal.body
    h5.vcentered: t 'modal.profile.message'
  modal.footer
    = bs-button onClick=(route-action 'transitionToHome')
      t 'modal.profile.back'
