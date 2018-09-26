.__datasources__edit
  .container-fluid
    .row.title-block
      .col-12
        h3.title
          i.mdi.mdi-database
          = t 'datasources.edit.title' datasourceName=model.name
    .row
      .col-12
        form
          .form-group.row
            label.col-2.col-form-label
              "#{t 'forms.name.label'}:
            .col-10
              = input type="text" class="form-control" value=model.name
          .form-group.row
            label.col-2.col-form-label
              "#{t 'forms.description.label'}:
            .col-10
              = textarea class="form-control" value=model.description maxlength=1000 rows=8
          .form-group.row
            if (not-eq model.format 'JDBC')
              label.col-2.col-form-label
                "#{t 'forms.format.label'}:
              .col-10.col-md-3
                select.form-control onchange={action (mut model.format) value='target.value'}
                  option
                  each formats as |format|
                    option value={format.value} selected={eq format.value model.format}
                      = format.name
              label.col-2.col-md-auto.col-form-label
                "#{t 'forms.encode.label'}:
              .col-10.col-md-3
                select.form-control onchange={action (mut model.encoding) value='target.value'}
                  option
                  each encodings as |encoding|
                    option value={encoding.value} selected={eq encoding.value model.encoding}
                      = encoding.name

            label.col-2.col-md-auto.col-form-label.checkbox-label
              "#{t 'forms.public.label'}:
            .col-10.col-md-auto.checkbox
              label.btn.btn-secondary.check class={model.is_public} click={action 'toggleIsPublic'}
                i.mdi.mdi-check
          if (not-eq model.format 'JDBC')
            .form-group.row
              label.col-2.col-form-label
                "#{t 'forms.treat_as_missing.label'}:
              .col-10
                = input type="text" class="form-control" value=model.treat_as_missing
            .form-group.row
              label.col-2.col-form-label
                "#{t 'forms.delimiter.label'}:
              .col-10.col-md-3
                = datasources/select2-input attr=model.attribute_delimiter options=attrDelimiters
              label.col-2.col-md-auto.col-form-label
                "#{t 'forms.quote-char.label'}:
              .col-10.col-md-3
                = datasources/select2-input attr=model.text_delimiter options=textDelimiters
              label.col-2.col-sm-auto.col-form-label.checkbox-label
                "#{t 'forms.header.label'}:
              .col-10.col-md-auto.checkbox
                label.btn.btn-secondary.check class={model.is_first_line_header} click={action 'toggleIsFirstLineHeader'}
                  i.mdi.mdi-check
          .form-group.row
            .col-2
            .col-10
              button.btn.btn-secondary.infer-schema click={action 'inferSchema'}
                = t 'forms.infer-schema.label'
          .form-group.row
            label.col-12.form-control-label
              "#{t 'forms.attributes.label'}:
              span.label-append
                = t 'forms.attributes.label-append' resource=(t 'datasources.singular')
            .col-12
              = datasources/attributes-table attributes=model.attributes
          .form-group.row.form-footer
            .col-12
              button.btn.btn-primary.save click={action 'saveDatasource'}
                i.mdi.mdi-content-save
                = t 'datasources.edit.save-button'
              button.btn.btn-primary.btn-danger click={action 'transitionTo' '/home/datasources'}
                i.mdi.mdi-home
                = t 'datasources.edit.transition-button' route=(t 'datasources.self')
= datasources/alert-modal alertContent=alertContent alertModal=alertModal alertCallback=alertCallback
