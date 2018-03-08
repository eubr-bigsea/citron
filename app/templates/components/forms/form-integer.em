.form-group
    p.title
      span.label title=field.label
        =field.label
      if field.required
        span.fa.fa-asterisk
      span.fa.fa-question-circle.pull-right title=field.help
    .form-field
      =input class="form-control" type="number" maxlenght="10" onchange=(action 'valueChanged' value='target.value') value=currentValue pattern="\\d*"
