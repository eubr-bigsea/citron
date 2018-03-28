.form-group
    p.title
      span.label title=field.label
        =field.label
      if field.required
        span.fa.fa-asterisk
      span.fa.fa-question-circle.pull-right title=field.help
    .form-field
      select onchange={action 'valueChanged'} multiple="true" class="form-control" style="width: 100%"
