.card#video-tutorial
  .card-header
    .header-block
      h3.title: = card.title
  .card-block
    .video-wrapper
      = ember-youtube ytid=card.content.link
