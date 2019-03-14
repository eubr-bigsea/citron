.__documentation
  header#header-wrap
    section#header
      .navbar.navbar-expand-md.navbar-light.bg-faded.fixed-top
        .container
          button.navbar-toggler.navbar-toggler-right.landing-page-button type='button' data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation"
            span.navbar-toggler-icon
          a.navbar-brand.mx-auto
            a href='landing-page'
              .logo title='lemonade' alt=""
            span Lemonade
        .locales class={i18n.locale}
          a.en click={action 'setLocale' 'en'}
            img src='assets/images/en.png'
          a.pt click={action 'setLocale' 'pt'}
            img src='assets/images/pt.png'
  .page-wrapper
    = documentation/side-menu operations=data setPageSlug=(action 'setPageSlug')
    = documentation/iframe-current-documentation pageDocumentation=pageDocumentation
= outlet
