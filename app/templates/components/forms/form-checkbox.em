.form-group
  p.title
    label class='btn btn-secondary' click={action 'valueChanged'}
      i class='mdi mdi-check'
    span.label title=field.label
      =field.label
    if form.required
      span.fa.fa-asterisk
    span.fa.fa-question-circle.pull-right title=field.help
