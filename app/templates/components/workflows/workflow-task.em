if isComment
  .comment-note
    = textarea value=task.forms.comment.value
  a.remove-task.pull-right href='#' click={action 'removeTask' task}
    i.mdi.mdi-close
else
  .task-wrapper.pull-left click={action 'clickTask'}
    .name-container
      span.operation-name
        i class={concat 'fa' operation.icon}
        =task.name
