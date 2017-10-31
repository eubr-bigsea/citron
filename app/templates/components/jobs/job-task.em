.container title={t 'task.tooltip'}
  .row
    if isComment
      .col-xs-11.comment-note
        .comment-text
          span: comment
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
            span: comment
      #testDelete.col-xs-1
        .delete-btn
          i#testDelete.fa.fa-trash-o href="#"
