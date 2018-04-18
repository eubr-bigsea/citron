//.diagram-options
  //label: "Diagram Option
  a.btn.btn-primary.btn-md class={zoomMax} href="#" onclick={action 'zoomIn'}
    i.mdi.mdi-magnify-plus-outline
  a.btn.btn-primary.btn-md class={zoomMin} href="#"  onclick={action 'zoomOut'}
    i.mdi.mdi-magnify-minus-outline
.lemonade-container#lemonade-container
  .lemonade-diagram#lemonade-diagram
    each workflow.tasks as |task|
      = workflows/workflow-task elementId=task.id operations=operations task=task clickTask=clickTask removeTask=(action 'removeTask') setDraggable=(action 'setDraggable') addEndpoint=(action 'addEndpoint')
if displayForm
  = workflows/workflow-forms task=selectedTask formsChanged=formsChanged hasChanged=hasChanged removeTask=(action 'removeTask') getAttributeSuggestions=getAttributeSuggestions
