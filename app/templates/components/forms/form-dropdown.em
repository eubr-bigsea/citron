.form-group
  p.title
    span.label title=field.label
      =field.label
    if field.required
      span.fa.fa-asterisk
    span.fa.fa-question-circle.pull-right title=field.help
  .form-field
    select class="form-control" onchange={action 'valueChanged' value='target.value'}
      option
      each parsedValues as |option|
        option selected={eq currentValue option.key} value=option.key
          =option.value
