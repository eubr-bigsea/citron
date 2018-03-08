.form-group
    p.title
      span.label title=field.label
        =field.label
      if field.required
        span.fa.fa-asterisk
      span.fa.fa-question-circle.pull-right title=field.help
    .form-field
      button.btn.btn-primary.open-editor onclick={action 'showModal'}: "Open Editor
      if modalVisible
        =bs-modal class=(concat componentCssClassName ' expression-modal') onHide=(action 'hideModal') fade=false as |modal|
          =modal.header
            h4: "Expression
            em: "Construct an expression to transform data
          =modal.body
            h5: "Function reference
            =bs-tab as |tab|
              each parsedValues as |value i|
                =tab.pane fade=false title=value.category as |tab|
                  .table-wrapper
                   table.table.table-striped.table-bordered
                     thead
                       tr
                         th Name
                         th Description
                         th Syntax
                     tbody
                       each value.functions as |function|
                         tr
                           td: =function.name
                           td: =function.help
                           td: =function.syntax
            =input id="typeExpression" value=expression type="textarea" key-up='parseExpression' type="text" class="form-control"
            .alert-info#resultExpression
              =tree
          =modal.footer
            =bs-button id="cancelButton" onClick=(action modal.close) type="secondary"
              "Cancel
            =bs-button id="okButton" onClick=(action 'valueChanged') type="success"
              "OK
