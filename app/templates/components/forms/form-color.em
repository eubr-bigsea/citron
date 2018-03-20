.form-group
  p.title
    span.label title=field.label
      =field.label
    if field.required
      span.fa.fa-asterisk
    span.fa.fa-question-circle.pull-right title=field.help
  .form-field
    .color-wrapper
      = spectrum-color-picker color=taskColor clickoutFiresChange=true showButtons=false preferredFormat='hex' change=(action 'colorChanged') onMove=(action 'colorChanged')
