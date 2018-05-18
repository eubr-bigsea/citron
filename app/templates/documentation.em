.__documentation
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
                = link-to 'landing-page' class="page-scroll nav-link"
                  = t 'landing-page.home'
              li.nav-item
                = link-to 'landing-page' class="page-scroll nav-link"
                  = t 'landing-page.about-us'
              li.nav-item
                = link-to 'landing-page' class="page-scroll nav-link"
                  = t 'landing-page.services'
              li.nav-item
                = link-to 'landing-page' class="page-scroll nav-link"
                  = t 'landing-page.meet-us'
              li.nav-item.active
                = link-to 'documentation' class="page-scroll nav-link"
                  = t 'landing-page.documentation'
        .locales class={i18n.locale}
          a.en click={action 'setLocale' 'en'}
            img src='assets/images/en.png'
          a.pt click={action 'setLocale' 'pt'}
            img src='assets/images/pt.png'
  .page-wrapper
    = documentation/side-menu operations=model setPageSlug=(action 'setPageSlug') 
    = documentation/iframe-current-documentation pageDocumentation=pageDocumentation
= outlet
