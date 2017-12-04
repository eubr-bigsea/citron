.container-fluid.__user__edit
  .row
    .col-xs-12.title-block
      h3.title
        t 'forms.yourProfile'
        strong: model.firstName
    .col-xs-12
      .form-group#first_name
        label for='firstName'
          = t 'forms.firstName.label'
        = input#firstName value=model.firstName name='firstName' type='text' placeholder=(t 'forms.firstName.placeholder')
        each model.errors.firstName as |error|
          span.has-error : = error.message
      .form-group#last_name
        label for='lastName'
          = t 'forms.firstName.label'
        = input#lastName name='lastName' type='text' placeholder=(t 'forms.lastName.placeholder') value=model.lastName
        each model.errors.lastName as |error|
          span.has-error : = error.message
      .form-group
        label for='email'
          = t 'forms.email.label'
        = input#email name='email' readonly='readonly' type='text' placeholder=(t 'forms.email.placeholder') value=model.email
      .form-group#locales
        label for='locales'
          =t 'forms.locale.label'
        select name='locales' onchange={action (mut model.locale) value="target.value"}
          each locales as |locale|
            option value=locale selected={eq locale model.locale}
              = t locale
      if changePassword
        .form-group#current_password
          label for='currentPassword'
            = t 'forms.currentPassword.label'
          = input name='currentPassword' type='password' placeholder=(t 'forms.password.placeholder') value=model.currentPassword
          a.btn.btn-primary onclick={route-action 'togglePassword' 'current_password'}
            = t 'forms.show'
          each model.errors.current_password as |error|
            span.has-error
              = error.message
        .form-group#password
          label for='password'
            = t 'forms.newPassword.label'
          = input name='password' type='password' placeholder=(t 'forms.password.placeholder') value=model.password
          a.btn.btn-primary onclick={route-action 'togglePassword' 'password'}
            = t 'forms.show'
          each model.errors.password as |error|
            span.has-error
              = error.message
        .form-group#password_confirmation
          label for='newPasswordConfirmation'
            = t 'forms.newPasswordConfirmation.label'
          = input type='password' placeholder=(t 'forms.password.placeholder') value=model.passwordConfirmation
          a.btn.btn-primary onclick={route-action 'togglePassword' 'password_confirmation'}
            = t 'forms.show'
          each model.errors.password_confirmation as |error|
            span.has-error
              = error.message
      .form-group.row
        .col-sm-10.offset-sm-2
          button.btn.btn-primary.confirm onclick={route-action 'save'}
            = t 'forms.save'
          button type="info" class="btn btn-primary info" onclick={route-action 'toggleChangePassword'}
            if changePassword
              = t 'forms.notChangePassword'
            else
              = t 'forms.changePassword'
          = link-to 'home' class='btn btn-danger'
            = t 'forms.cancel'
