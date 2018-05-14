.__landing-page
  header#header-wrap
    section#header
      .navbar.navbar-expand-md.navbar-light.bg-faded.fixed-top
        .container
          button.navbar-toggler.navbar-toggler-right.landing-page-button type='button' data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation"
            span.navbar-toggler-icon
          a.navbar-brand.mx-auto
            = link-to 'landing-page'
              img.lemonade-logo src="assets/images/logo2.png" alt=""
          .collapse.navbar-collapse.float-xs-left id="main-menu"
            ul.navbar-nav.ml-auto
              li.nav-item.active
                a.page-scroll.nav-link href="#header"
                  = t 'landing-page.home'
              li.nav-item
                a.page-scroll.nav-link href="#about-us"
                  = t 'landing-page.about-us'
              li.nav-item
                a.page-scroll.nav-link href="#our-services"
                  = t 'landing-page.services'
              li.nav-item
                a.page-scroll.nav-link href="#meet-us"
                  = t 'landing-page.meet-us'
        .locales class={i18n.locale}
          a.en click={action 'setLocale' 'en'}
            img src='assets/images/en.png'
          a.pt click={action 'setLocale' 'pt'}
            img src='assets/images/pt.png'
  = documentation/side-menu operations=model currentOperation=currentOperation
  = documentation/iframe-current-documentation currentDocLink=currentDocLink
= outlet
