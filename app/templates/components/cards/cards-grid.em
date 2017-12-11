each configurations as |el|
  .grid-stack-item data-card-id={el.card-id} data-card-component={el.component} data-gs-x={el.x} data-gs-y={el.y} data-gs-width={el.width} data-gs-height={el.height}
    div class="grid-stack-item-content"
      = component (concat 'cards/card-' el.component) conf=el
