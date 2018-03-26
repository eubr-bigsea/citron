.form-group
    p.title
      span.label title=field.label
        = field.label
      if field.required
        span.fa.fa-asterisk
      span.fa.fa-question-circle.pull-right title=field.help
    .form-field
      button.btn.btn-primary.open-editor onclick={action 'showModal'}: = t 'form-expression.buttons.open-editor'
      = bs-modal class=(concat componentCssClassName ' expression-modal') open=expressionModal backdropClose=true fade=fade onHidden=(action (mut expressionModal) false) as |modal|
        = modal.header
          .title
            h4
              i.mdi.mdi-wrench
              = field.label
            p: = field.help
        = modal.body
          table.table.table-striped.expressions
            thead
              tr
                th: = t 'form-expression.modal.table.expression'
                th.alias: = t 'form-expression.modal.table.alias'
                th.buttons
            tbody
              each parsedValues as |value|
                tr
                  td
                    = input class="form-control" value=value.expression key-up=(action 'parseExpression' value)
                  td.alias
                    = input class="form-control" value=value.alias
                  td.buttons
                    button.btn.btn-primary.btn-sm click={action 'removeRow' value}
                      i.mdi.mdi-close
                if value.error
                  tr
                    td.alert.alert-danger: = value.error
                  tr
                    td.separator
          button.btn.btn-sm.add click={action 'addRow'}
            i.mdi.mdi-plus
            = t 'form-expression.modal.buttons.add'
        = modal.footer
          = bs-button id="cancelButton" onClick=(action (mut expressionModal) false) type="secondary"
            = t 'form-expression.buttons.cancel'
          = bs-button id="okButton" onClick=(action 'valueChanged') type="success"
            = t 'form-expression.buttons.save'
