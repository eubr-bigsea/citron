= bs-modal class=componentCssClassName open=executionModal backdropClose=true fade=fade backdrop=false onHidden=(action (mut executionModal) false) as |modal|
  modal.header
    h4.modal-title.vcentered
     i.mdi.mdi-lan
     span.text: t 'workflows.pre-execution-modal.title'
  modal.body
    = input value=jobHash.name

    select onchange={action (mut jobHash.cluster.id) value="target.value"}
      each clusters as |cl|
        option value={cl.id} selected={eq jobHash.cluster.id cl.id}
          = cl.name
  modal.footer
    = bs-button onClick=executeWorkflow
      t 'modal.default.submitButton'
    = bs-button onClick=(action (mut executionModal) false)
      t 'modal.default.cancelButton'
