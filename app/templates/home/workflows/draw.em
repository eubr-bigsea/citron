.__workflows__draw
  = workflows/operations-sidebar operations=model.operations groupedOperations=model.groupedOperations
  .container-fluid#diagram-container-wrapper
    .option-bar.row
      .col-xs-12.col-md-7.col-lg-8.col-xl-5.vcentered.__name
        = input value=model.workflow.name class="form-control underlined"
      .col-sm-12.col-xl-4.vcentered.__buttons
        a.btn.btn-primary.btn-md rel="tooltip" title={t 'workflow.draw.save'} onclick={action 'saveWorkflow'}
          i.mdi.mdi-content-save
        a.btn.btn-primary.btn-md rel="tooltip" title={t 'workflow.draw.delete'} onclick={action 'toggleDeleteModal'}
          i.mdi.mdi-delete
        a.btn.btn-primary.btn-md class={zoomMax} href="#" onclick={action 'zoomIn'}
          i.mdi.mdi-magnify-plus-outline
        a.btn.btn-primary.btn-md class={zoomMin} href="#"  onclick={action 'zoomOut'}
          i.mdi.mdi-magnify-minus-outline
      .col-sm-12.col-xl-4.vcentered.__execute
        a.btn.btn-md.play onclick={action 'toggleExecutionModal'}
          i.mdi.mdi-play
            = t 'workflow.draw.play'
    .workflow.draw.row#workflow-draw
      .lemonade-container#lemonade-container
        = workflows/workflow-diagram jsplumb=jsplumb zoomScale=zoomScale workflow=model.workflow operations=model.operations hasChanged=hasChanged clickTask=(action 'clickTask') closeForms=(action 'closeForms') getAttributeSuggestions=(action 'getAttributeSuggestions')
      if displayForm
        = workflows/workflow-forms task=selectedTask formsChanged=formsChanged hasChanged=hasChanged getAttributeSuggestions=(action 'getAttributeSuggestions')
= workflows/pre-execution-modal executionModal=executionModal clusters=model.clusters jobHash=jobHash workflowName=model.workflow.name executeWorkflow=(action 'executeWorkflow')
= workflows/alert-modal title=alertContent.title message=alertContent.message alertModal=alertModal
= workflows/delete-modal deleteModal=deleteModal deleteWorkflow=(action 'deleteWorkflow') workflow=model.workflow
= workflows/unsaved-changes-modal unsavedModal=unsavedModal confirmTransition=(action 'retryTransition') cancelTransition=(action 'abortTransition') saveWorkflow=(action 'saveWorkflow')
