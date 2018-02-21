each workflow.tasks as |task|
  = workflows/workflow-task operations=operations task=task clickTask=clickTask removeTask=(action 'removeTask') setDraggable=(action 'setDraggable') addEndpoint=(action 'addEndpoint')
