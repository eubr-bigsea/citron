.operations-list#operations-list
  ul.metismenu#categories-list
    each operations as | elementArray |
      if elementArray.operation
        li
          a href="#" onclick={action 'setOperation' operation.slug}
            span: elementArray.group
      else if elementArray.operations
        li
          a href="#"
            i class="fa"
            span: elementArray.group
          ul
            = each elementArray.operations as |element|
              li.vrau
                a href="#" onclick={action 'setOperation' element.operation.slug}
                  span: element.operation.name
      else if elementArray.subGroups
        li
          a href="#"
            i class="fa"
            span: elementArray.group
          ul
            = each elementArray.subGroups as |subGroup|
              li
                a href="#"
                  i class="fa"
                  span: subGroup.subGroup
                ul
                  = each subGroup.operations as |element|
                    li
                      a href="#" onclick={action 'setOperation' element.operation.slug}
                        span: element.operation.name