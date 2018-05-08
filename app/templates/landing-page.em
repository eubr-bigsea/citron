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
  .bgimg
    #free-promo style="text-align: center;"
      .container
        .text-center style="padding-top:14%;"
          .error-page
            h2: a.titulo
              = t 'landing-page.greeting'
            = link-to (t 'landing-page.login') 'login' class="btn-lndg-pg btn-common btn-lg"
            = link-to (t 'landing-page.sign-up') 'signup' class="btn-lndg-pg btn-common btn-lg"
  a#about-us
  section.section#service-block-main
    .container
      h1.section-title.wow.fadeIn.animated data-wow-delay=".2s"
        = t 'landing-page.about-lemonade.title'
      p.section-subcontent
        = t 'landing-page.about-lemonade.text'
      .row
        div.col-3.col-sm-6
          .service-item.wow.fadeInUpQuick.animated data-wow-delay=".5s"
            h2 = t 'landing-page.workflows.title'
            p = t 'landing-page.workflows.text'
        .col-3.col-sm-6
          .service-item.wow.fadeInUpQuick.animated data-wow-delay=".8s"
            h2 = t 'landing-page.datasources.title'
            p = t 'landing-page.datasources.text'
        .col-3.col-sm-6
          .service-item.wow.fadeInUpQuick.animated data-wow-delay="1.1s"
            h2 = t 'landing-page.jobs.title'
            p = t 'landing-page.jobs.text'
        .col-3.col-sm-6
          .service-item.wow.fadeInUpQuick.animated data-wow-delay="1.4s"
            h2 = t 'landing-page.dashboards.title'
            p = t 'landing-page.dashboards.text'
  a#our-services
  section.section#other-services style="background-color: #F6F6F6;"
    .container
      h1.section-title.wow.fadeInUpQuick
        = t 'landing-page.our-services.title'
      p.section-subcontent
        = t 'landing-page.our-services.text'
      .col-12
        ul.nav.nav-tabs.flex-column#myTab role="tablist"
          li.nav-item
            a.nav-link.active data-toggle="tab" href="#home" role="tab" aria-controls="home"
              i.icon-screen-desktop
          li.nav-item
            a.nav-link data-toggle="tab" href="#profile" role="tab" aria-controls="profile"
            i.icon-settings
          li.nav-item
            a.nav-link data-toggle="tab" href="#messages" role="tab" aria-controls="messages"
              i.icon-heart
          li.nav-item
            a.nav-link data-toggle="tab" href="#juicer" role="tab" aria-controls="juicer"
              i.icon-layers
          li.nav-item
            a.nav-link data-toggle="tab" href="#stand" role="tab" aria-controls="stand"
              i.icon-layers
          li.nav-item
            a.nav-link data-toggle="tab" href="#thorn" role="tab" aria-controls="thorn"
              i.icon-layers
          li.nav-item
            a.nav-link data-toggle="tab" href="#caipirinha" role="tab" aria-controls="caipirinha"
              i.icon-layers
        .tab-content
          .tab-pane.active#home role="tabpanel"
            .service-content.wow.fadeInUpQuick
              img src="assets/images/limonero.png"
              p.lead
                = t 'landing-page.limonero'
          .tab-pane#profile role="tabpanel"
            .service-content.wow.fadeInUpQuick
              img src="assets/images/tahiti.png"
              p.lead
                = t 'landing-page.tahiti'
          .tab-pane#messages role="tabpanel"
            .service-content.fadeInUpQuick
              img src="assets/images/citron.png"
              p.lead
                = t 'landing-page.citron'
          .tab-pane#juicer role="tabpanel"
            .service-content.fadeInUpQuick
              img src="assets/images/juicer.png"
              p.lead
                = t 'landing-page.juicer'
          .tab-pane#stand role="tabpanel"
            .service-content.fadeInUpQuick
              img src="assets/images/stand.png"
              p.lead
                = t 'landing-page.stand'
          .tab-pane#thorn role="tabpanel"
            .service-content.fadeInUpQuick
              img src="assets/images/thorn.png"
              p.lead
                = t 'landing-page.thorn'
          .tab-pane#caipirinha role="tabpanel"
            .service-content.fadeInUpQuick
              img src="assets/images/capirinha.png"
              p.lead
                = t 'landing-page.caipirinha'
  a#meet-us
  section.section#team
    .container
      .row.col-12
        h1.section-title.wow.fadeInDown.col-12 data-wow-delay=".5s"
          = t 'landing-page.meet-team'
        p.section-subcontent
        .team-wraper style="margin-left: 20%;"
          .column
            a: b = t 'landing-page.principals'
            ul
              li Adriano Cesar Machado Pereira
              li Adriano Alonso Veloso
              li Clodoveu Alves Davis Jr.
              li Dorgival Guedes Neto
              li Gisele Lobo Pappa
              li Humberto Torres Marques Neto
              li Leandro Balby Marinho
              li Loic Cerf
              li Marco Vieira
              li Nazareno Andrade
              li Nuno Antunes
              li Raquel Cardoso Melo Minardi
              li Regina Moraes
              li Renato Antonio Celso Ferreira
              li Wagner Meira Jr.
          .column
            a: b = t 'landing-page.devs'
            ul
              li Fernando Carvalho
              li Geraldo Franciscani
              li Gustavo Avelar
              li Israel Guerra de Moura
              li João Víctor Bárbara
              li Lucas Ponce
              li Matheus Gonçalves
              li Michel Boaventura
              li Pedro Nascimento
              li Tania Basso
              li Vinícius Dias
              li Walter dos Santos Filho
              li Yuri Carvalho Pains
              li Zilton Júnior
  a#footer
  footer#team
    .container-fluid
      .row
        .col-12
         h1.section-title.wow.fadeInDown data-wow-delay=".5s": = t 'landing-page.supporters'
         a href="http://www.eubra-bigsea.eu/"
           img src="assets/images/bigsea.png"
         a href="http://www.inweb.org.br/"
           img src="assets/images/inweb.png"
         a href="http://www.citc.rnp.br/"
           img src="assets/images/ctic.png"
         a href="http://www.rnp.br/"
           img src="assets/images/rnp.png"
         a href="http://www.ceweb.br/"
           img src="assets/images/ceweb.png"
         a href="http://www.nic.br/"
           img src="assets/images/nic.png"
         a href="http://www.cnpq.br/"
           img src="assets/images/cnpq.png"
         a href="http://www.capes.br/"
           img src="assets/images/capes.png"
         a href="http://www.fapemig.br/"
           img src="assets/images/fapemig.png"
