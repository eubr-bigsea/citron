.form-group
  p.title
    span.label title=field.label
      =field.label
    if field.required
      span.fa.fa-asterisk
    span.fa.fa-question-circle.pull-right title=field.help
  .form-field
    select.form-control onchange={action 'valueChanged'} style="width: 100%"
