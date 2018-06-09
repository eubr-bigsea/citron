.operations-list#operations-list
  ul.metismenu#categories-list
    each operations as | elementArray |
      = each-in elementArray as |group subgroup|
        if (eq group "_data")
          each subgroup as |operation|
            li
              a href="#" onclick={action 'setOperation' operation.slug}
                span: operation.name
        else
          li
            a href="#"
              i class="fa"
              span: group
            ul
              each subgroup as |subElements|
                = each-in subElements as |op elements|
                  if (eq op "_data")
                    each elements as |element|
                      li
                        a href="#" onclick={action 'setOperation' element.slug}
                          span: element.name
                  else
                    li
                      a href="#"
                        i class="fa"
                        span: op
                      ul
                       = each-in elements as |sub element|
                          each element as |el|
                            li
                              a href="#" onclick={action 'setOperation' el.slug}
                                span: el.name