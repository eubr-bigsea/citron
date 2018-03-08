.form-group
    p.title
      span.label title=field.label
        =field.label
      if field.required
        span.fa.fa-asterisk
      span.fa.fa-question-circle.pull-right title=field.help
    .form-field
      select.form-control multiple="multiple"
        option
        each parsedValues as |opt|
          option value=opt.key
            =opt.value
