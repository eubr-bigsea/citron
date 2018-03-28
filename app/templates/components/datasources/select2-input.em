select.form-control onchange={action (mut attr) value="target.value"}
  option
  each options as |opt|
    option selected={eq attr opt.value} value={opt.value}
      = opt.name
