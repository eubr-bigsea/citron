.container title={t 'task.tooltip'}
  .row
    if (eq task.operation.slug 'comment')
      .col-xs-11.comment-note
        .comment-text
          span: task.forms.comment.value
    else
      .col-xs-11.operation
        .name-container
          span.operation-name
            i.fa class=task.operation.icon
            if task.name
              task.name
            else
              task.operation.name
        .comment-container
          .comment-text.comment-task
            span: task.forms.comment.value
      .col-xs-1.__status class=task.step.status
          i.__icon
