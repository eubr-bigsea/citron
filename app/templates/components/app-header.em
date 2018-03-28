nav.navbar.navbar-expand.navbar-light
  .collapse.navbar-collapse
    ul.navbar-nav.ml-auto
      li.nav-item.dropdown
        a.nav-link.dropdown-toggle.name href="#" id="profileDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
          "#{sessionAccount.user.firstName} #{sessionAccount.user.lastName}
        .dropdown-menu.dropdown-menu-right aria-labelledby="profileDropdown"
          .dropdown-divider
          = link-to 'home.user.edit' sessionAccount.user.id class="dropdown-item"
            i.mdi.mdi-account
            = t 'profile'
          .dropdown-divider
          a.dropdown-item href="#" click={action 'invalidateSession'}
            i.mdi.mdi-logout-variant
            = t 'logout'
          .dropdown-divider
