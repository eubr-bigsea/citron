td.remove-attr
  button.btn.btn-secondary click={action 'removeAttr'}
    i.mdi.mdi-close.fa
td.name
  = input class="form-control" value=attr.name
td.center.types
  select.form-control onchange={action (mut attr.type) value="target.value"}
    option value=""
    each types as |type|
      option value={type} selected={eq type attr.type}
        = type
td.center.num
  = input class='form-control' disabled=isNotChar value=attr.size
td.center.num
  = input class='form-control' disabled=isNotNum value=attr.scale
td.center.num
  = input class='form-control' disabled=isNotNum value=attr.precision
td.center.missing
  = input class='form-control' value=attr.missing_representation
td.center.checkbox
  label.btn.btn-secondary.check class={attr.nullable} click={action 'toggleNullable'}
    i.mdi.mdi-check
