fieldset style='border:none'
  legend: t 'form.title'
  .form-group
    p.title
      span.label title={t 'form.task.name'}
        =t 'form.task.name'
      span.fa.fa-question-circle.pull-right title={t 'form.task.helper'}
    .form-field
      =input class="form-control" value=task.name
each task.operation.forms as |form|
  fieldset
    legend: =form.name
    each form.fields as |field|
      .form-group
        p.title
          span.label title=field.label
            =field.label
          if field.required
            span.fa.fa-asterisk
          span.fa.fa-question-circle.pull-right title=field.help
        .form-field
          =component (concat 'forms/form-' field.suggested_widget) currentValue=(get (get task.forms field.name) 'value') name=field.name field=field onValueChanged=(action 'formChanged') getAttributeSuggestions=getAttributeSuggestions
