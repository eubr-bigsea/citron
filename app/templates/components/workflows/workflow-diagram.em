each workflow.tasks as |task|
  = workflows/workflow-task elementId=task.id operations=operations task=task clickTask=clickTask removeTask=(action 'removeTask') setDraggable=(action 'setDraggable') addEndpoint=(action 'addEndpoint')
