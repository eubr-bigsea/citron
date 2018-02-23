each task.operation.forms as |form|
  fieldset
    legend: =form.name
    each form.fields as |field|
      p
        =field.label
        if field.required
          span.fa.fa-asterisk
        span.fa.fa-question-circle.pull-right title=field.help
      =component (concat 'forms/form-' field.suggested_widget) currentValue=(get (get task.forms field.name) 'value') name=field.name field=field onValueChanged=(action 'formChanged') getAttributeSuggestions=getAttributeSuggestions
