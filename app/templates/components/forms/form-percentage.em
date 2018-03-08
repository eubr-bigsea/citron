.form-group
    p.title
      span.label title=field.label
        =field.label
      if field.required
        span.fa.fa-asterisk
      span.fa.fa-question-circle.pull-right title=field.help
    .form-field
      =input type="range" change=(action 'valueChanged' value='target.value') class="form-control" value=value min="1" max="99"
      span.tag.tag-pill.tag-info
        |#{value}% - #{deltaValue}%
