.grid-stack
  each configurations as |el|
    .grid-stack-item id={el.uuid} data-card-id={el.card-id} data-card-component={el.component} data-gs-x={el.x} data-gs-y={el.y} data-gs-width={el.width} data-gs-height={el.height} data-uuid={el.uuid}
      .grid-stack-item-content
        a.remove click={action 'remove' el.uuid}
          i.fa.fa-trash-o
        = component (concat 'cards/card-' el.component) conf=el class='card'
.add-cards-popup
  if addingCards
    .popup-block
      ul: each cards as |card|
        li click={action 'addCard' card}
          i.fa.fa-plus
          span: = card.title
  button.btn.btn-default.btn-circle click={action 'toggleAddingCards'}
    if addingCards
      i.fa.fa-minus
    else
      i.fa.fa-plus
