.container
  .row
    if isComment
      .col-xs-11.comment-note
        .comment-text
          span: comment
    else
      .col-xs-11.operation click={action 'clickTask'}
        .name-container
          span.operation-name
            i class={concat 'fa' operation.icon}
            =input value=task.name autocomplete='off' placeholder=operation.name
        .comment-container
          .comment-text.comment-task
            span: comment
    .col-xs-1 click={removeTask task endpoints}
      .delete-btn
        i.fa.fa-trash-alt href="#"
