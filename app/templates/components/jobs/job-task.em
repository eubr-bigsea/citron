if (eq task.operation.slug 'comment')
  .comment-note
    span: task.forms.comment.value
else
  .task-wrapper.pull-left
    .name-container
      i class={concat 'fa' task.operation.icon}
      span.operation-name: =task.name
