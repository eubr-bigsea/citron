.__landing-page
  header#header-wrap
    section#header
      nav.navbar.navbar-light.navbar-fixed-top data-spy="affix" data-offset-top="50"
        .container
          button.navbar-toggler.hidden-md-up.pull-xs-right data-target='#main-menu' data-toggle='collapse' type='button'
          = link-to 'landing-page' class="navbar-brand"
            img.lemonade-logo src="assets/images/logo2.png" alt=""
          .collapse.navbar-toggleable-sm.float-xs-left.float-md-right#main-menu
            ul.nav.nav-inline
              li.nav-item
                a.page-scroll.nav-link href="#header" Home
              li.nav-item
                a.page-scroll.nav-link href="#about-us" About Us
              li.nav-item
                a.page-scroll.nav-link href="#our-services" Services
              li.nav-item
                a.page-scroll.nav-link href="#meet-us" Meet Us
  .bgimg
    #free-promo style="text-align: center;"
      .container
        .row.text-center style="padding-top:14%;"
          .error-page
            h2: a.titulo Welcome to Lemonade!
            = link-to 'Login' 'login' class="btn-lndg-pg btn-common btn-lg"
            = link-to 'Sign Up' 'signup' class="btn-lndg-pg btn-common btn-lg"
  a#about-us
  section.section#service-block-main
    .container
      .row
        h1.section-title.wow.fadeIn.animated data-wow-delay=".2s" About Lemonade:
        p.section-subcontent
         "Data analytics is a concept related to pattern and relevant knowledge discovery from large amounts of data. In feneral, the task is complex and demands knowledge in very specific areas, such as massive data processing and parallel programming languages. However, analysts are usually not versed in Computer Science, but in the original data domain. In order to support them in such analysis, we present <b>Lemonade</b> - Live Exploration and Mining Of a Non-trivial Amount of Data from Everywhere - A Platform for visual creation and execution of data analysis workflow
        div.col-sm-6.col-md-3
          .service-item.wow.fadeInUpQuick.animated data-wow-delay=".5s"
            h2 Create a Processing Workflow
            p You can create and cutomize workflows from scratch! There are several operations and filters available so you can manipulate your data by simply adding functionality boxes to your workflow with an easy drag-and-drop process.
        .col-sm-6.col-md-3
          .service-item.wow.fadeInUpQuick.animated data-wow-delay=".8s"
            h2 Import, Export or Manage Datasets
            p All your data can be imported in different formats to the application for proper manipulation. You can manage the imported datasets and later on you can export the resulting data with the formats of your choice.
        .col-sm-6.col-md-3
          .service-item.wow.fadeInUpQuick.animated data-wow-delay="1.1s"
            h2 Execute and Manage Existing Workflows
            p All your workflows are manageable, so you can access, create, edit or delete them at any time. You can also follow the progress of a workflow that is being executed and pause or stop it if you want.
        .col-sm-6.col-md-3
          .service-item.wow.fadeInUpQuick.animated data-wow-delay="1.4s"
            h2 Data Visualization
            p At the end of the process, you have features avaiable for a better visualization of the data, abstracting its schematic information into graphs and other visual forms.
  a#our-services
  section.section#other-services style="background-color: #F6F6F6;"
    .container
      .row
        h1.section-title.wow.fadeInUpQuick OUR SERVICES
        p.section-subcontent We split our service in 7 micro-components
        .col-sm-12.col-md-12
          ul.nav.nav-tabs#myTab role="tablist"
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
                  "Limonero stores meta-data about data sources and provides them as service.For each data source, it has information about its location access permissions, storage details (such as name, data type, size, precision, data format) and data characteristics such as distribution, missing values, mean and maximum values.
            .tab-pane#profile role="tabpanel"
              .service-content.wow.fadeInUpQuick
                img src="assets/images/tahiti.png"
                p.lead
                  "Tahiti maintains metadata about individual operations and dataflows created by users and provides them as service. Operations are the smallest units in Lemonade, and they are divided in five categories: execution, privacy/security, monitoring, appearance, and quality of service requirements (QoS).
            .tab-pane#messages role="tabpanel"
              .service-content.fadeInUpQuick
                img src="assets/images/citron.png"
                p.lead
                  "Citron is the web interface user use to create, execute, and monitor their data flows. With it, users can choose predefined operations, drag and conncect them throught their ports to compose a data flow.<br> Each operation’s associated parameters may be inspected and flows can be instantiated by the user. Citron also allows users to track the execution of operations by showing their status in real time.
            .tab-pane#juicer role="tabpanel"
              .service-content.fadeInUpQuick
                img src="assets/images/juicer.png"
                p.lead
                  "Juicer is the module that actually runs the data flows and supports the monitoring of their execution. Upon receiving a data flow, it generates the equivalent Spark source code, acting as a transpiler (source-to-source compiler), where each operation becomes a method.<br> The Spark code is then instantiated in the cloud execution environment, observing the user-defined QoS parameters to make sure operations execute with sufficient resources to meet user demands (e.g., the user may indicate the number of compute nodes required). During execution, Juicer is also responsible for logging any new datasets produced as output, recording any runtime events, and reporting status changes.
            .tab-pane#stand role="tabpanel"
              .service-content.fadeInUpQuick
                img src="assets/images/stand.png"
                p.lead
                  "Stand coordinates the communication between Citron and Juicer, ensuring independence between the two components. Execution starts when a user requests to run a dataflow through the Citron interface, which then invokes Stand,  which connects back to the first to provide feedback to the user.
            .tab-pane#thorn role="tabpanel"
              .service-content.fadeInUpQuick
                img src="assets/images/thorn.png"
                p.lead
                  "Thorn is responsible for security, privacy and access control (AAA) in Lemonade. Some of its tasks are challenging, such as determining who will be able to access the results from applying an operation to a database that contains sensitive attributes. Further, when an operation has multiple inputs, each with a different permission level, it must decide what should be the access policy for the resulting output. The current version implements simple control metrics, but its modular design allows more sophisticated control policies to be easily inserted.
            .tab-pane#caipirinha role="tabpanel"
              .service-content.fadeInUpQuick
                img src="assets/images/capirinha.png"
                p.lead
                  "Caipirinha provides visualizations through different visual metaphors.<br> Those include static data visualizations in well-defined formats, such as displaying samples from database records, time series graphs and histograms, and exploratory  views where users can parametrize the display according to their interests , such as zooming in on a particular region of a complex graph.
  a#meet-us
  section.section#team
    .container
      .row
        h1.section-title.wow.fadeInDown data-wow-delay=".5s" MEET OUR TEAM
        p.section-subcontent
        .team-wraper style="margin-left: 20%;"
          .column
            a: b Principal Investigators
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
            a: b Researchers and Developers
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
        .col-xs-12
         h1.section-title.wow.fadeInDown data-wow-delay=".5s" OUR SUPPORTERS
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
