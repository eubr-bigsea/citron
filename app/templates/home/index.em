.__home__index
  .container-fluid#page-content-wrapper
    = cards/cards-grid class="grid-stack" configurations=model.configurations saveGrid=(route-action 'saveGrid')
