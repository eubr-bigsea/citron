export default {
  'notFound': {
    'servers': 'Nossos servidores estão em manutenção.',
    'moreLemonade': 'Estamos fazendo mais Lemonade para você.',
    'message': 'O {{resource}} que você está procurando não está disponível',
    'goBack': 'Voltar para'
  },
  'task':{
    'tooltip': 'Clique duas vezes para ver detalhes',
  },
  //components inside of forms folder
  'form':{
    'attribute-function': {
      'button': 'Abrir o Editor',
      'modal': {
        'buttons': {
          'add': 'Adicionar',
        },
        'tab': {
          'editor': 'Editor',
          'references': 'Referências',
        },
        'table': {
          'attribute': 'Atributos',
          'function': 'Função',
          'column': {
            'function': 'Nome',
            'filter': 'Valor',
          }
        }
      },
    },
  },
  //Forms
  'forms': {
    'email': {
      'label': 'Email',
      'placeholder': 'exemplo@email.com'
    },
    'password': {
      'label': 'Senha',
      'placeholder': 'Mínimo de 6 caracteres.'
    },
    'passwordConfirmation': {
      'label': 'Confirme a senha',
      'placeholder': 'Deve ser igual a senha.'
    },
    'remember': {
      'label': 'Lembrar-se de mim'
    },
    'name': {
      'label': 'Nome',
      'placeholder': 'Seu nome'
    },
    'firstName': {
      'label': 'Nome',
      'placeholder': 'Primeiro nome'
    },
    'lastName': {
      'label': 'Sobrenome',
      'placeholder': 'Último nome'
    },
    'agree': {
      'label': 'Concordo com os termos e'
    },
    'locale': {
      'label': 'Língua'
    },
    'description': {
      'label': 'Descrição',
    },
    'images': {
      'label': 'Imagens'
    },
    'platform': {
      'label': 'Plataforma',
    },
    'cluster': {
      'label': 'Clusters',
    },
    'format': {
      'label': 'Formato',
    },
    'share': {
      'label': 'Compartilhar',
      'label-append': 'Compartilhe essa {{resource}} com outros usuários',
      'searchFor': 'Busque outros usuários para compartilhar'
    },
    'inferSchema': {
      'label': 'Inferir Atributos',
      'label-append': 'Defina opções para inferir campos da datasource',
      'delimiter': 'Delimitador',
      'quote-char': 'Enclosure',
      'header': 'Cabeçalho',
      'infer': 'Inferir Atributos',
    },
    'attributes': {
      'label': 'Atributos',
      'label-append': 'Edite os atributos desta datasource'
    },
    'public': {
      'label': 'Público',
    },
    'encode': {
      'label': 'Encode',
    },
    'treat_as_missing': {
      'label': 'Tratar como ausente',
    },
    'create': 'Criar',
    'save': 'Salvar',
    'cancel': 'Cancelar',
    'changePassword': 'Trocar senha',
    'policy': 'política',
    'alreadyAccount': 'Já tem uma conta',
    'forgotPassword': 'Esqueceu a senha',
    'noAccount': 'Ainda não possui conta',
    'signUp': 'Inscreva-se',
    'login': 'Entrar',
    'yourProfile': 'Seu perfil, ',
    'returnLogin': 'voltar para o Login',
  },
  'tables': {
    'id': 'ID',
    'logo': 'Logo',
    'name': 'Nome',
    'author': 'Autor',
    'updated': 'Atualizado em',
    'status': 'Status',
    'result': 'Resultado',
    'size': 'Tamanho',
    'format': 'Formato',
    'options': 'Opções',
    'created': 'Criado em',
    'started': 'Começou em',
    'finished': 'Terminou em',
    'email': 'Email',
    'permission': 'Permissão',
    'type': 'Tipo',
    'precision': 'Precisão',
    'scale': 'Escala',
    'nullable': 'Permite nulo',
    'treat_as_missing': 'Tratar como ausente',
    'description': 'Descrição',
    'attributes': 'Attributes',
    'values': 'Valores',
    'time': 'Tempo',
    'message': 'Menssagem',
  },

  'cards': {
    'latestEditedWorkflows': {
      'title': 'Últimos workflows editados',
    },
    'releaseNotes': {
      'title': 'Novidades - Lemonade ',
      'footer': 'Lançada em',
    },
    'latestUpdatedJobs': {
      'title': 'Últimos jobs atualizados',
    },
    'videoTutorial': {
      'title': 'Basic Tutorial',
    },
  },
  'alert': {
    'delete': {
      'workflow': {
        'success': 'O workflow foi apagado.',
        'error': 'Houve um erro, o workflow não foi apagado.'
      },
      'workflows': {
        'success': {
          'one':'O workflow foi apagado.',
          'other': 'Todos os {{count}} foram apagados.',
        },
        'error': {
          'one': 'Desculpe, o workflow não pode ser apagado.',
          'other': 'Desculpe, os workflows {{errors}} não puderam ser apagados.'
        },
      },
      'datasource': {
        'success': 'A datasource foi apagada.',
        'error': 'Houve um erro, a datasource não foi apagada.'
      },
    },
    'save': {
      'workflow': {
        'success': 'O workflow foi salvo.',
        'error': 'Houve um erro, o workflow não foi salvo.'
      }
    },
  },
  'modal': {
    'report': {
      'title':  'Relatório do Job',
    },
    'delete': {
      'workflow': {
        'title': 'Apagando o workflow:',
        'message': 'Você quer apagar permanentemente o workflow {{resource.name}}?',
        'submitButton': 'Apagar',
      },
      'workflows': {
        'title': {
          'zero': 'Nenhum workflow foi selecionado',
          'one': 'Apagando workflow',
          'other': 'Apagando workflows'
        },
        'message': {
          'zero': 'Você precisa de selecionar um workflow antes de apagar.',
          'one': 'Você quer apagar permanentemente o workflow selecionado?',
          'other': 'Você quer apagar permanentemente todos os {{count}} workflows selecionados?',
        },
        'submitButton': {
          'zero': 'Ok',
          'one':'Apagar',
          'other': 'Apagar Todos',
        },
      },
      'datasource': {
        'title': 'Apagando a datasource:',
        'message': 'Você quer apagar permanentemente a datasource {{resource.name}}?',
        'submitButton': 'Apagar',
      },
      'dashboard': {
        'title': 'Apagando o dashboard:',
        'message': 'Você quer apagar permanentemente o dashboard {{resource.name}}?',
        'submitButton': 'Apagar',
      }
    },
    'leave': {
      'workflow': {
        'title': 'Saindo da área de edição',
        'message': 'Todas as mudanças não salvas serão perdidas. Deseja continuar?',
        'submitButton': 'Sim, sair',
        'cancelButton': 'Ficar',
      }
    },
    'code': {
      'title': 'Código Fonte gerado pelo Job {{jobId}}',
      'cancelButton': 'Fechar'
    },
    'default': {
      'title': 'Aviso',
      'message': 'Você tem certeza disso?',
      'cancelButton': 'Cancelar',
      'submitButton': 'Ok',
    },
  },
  'workflow': {
    'self': 'Workflow',
    'edit': {
      'title': 'Editando o workflow:',
    },
    'new': {
      'title': 'Criando novo workflow:',
      'name': {
        'placeholder': 'Meu workflow',
      },
      'description': {
        'placeholder': 'Este é meu workflow...',
      },
    },
    'draw': {
      'save': 'Salvar',
      'delete': 'Apagar este workflow',
      'play': 'Executar'
    }
  },
  'workflows': {
    'self':'workflows',
    'title': 'Workflows',
    'description': 'Lista de todos os workflows - e.g. próprios, compartilhados, etc..',
    'newBtn': 'Criar novo',
    'moreActionsBtn': 'Mais ações',
    'deleteBtn': 'Apagar todos',
    'searchFor': 'Pesquisar',
  },
  'job': {
    'self': 'Job',
    'show': {
      'code': 'Código',
      'report': 'Relatório',
      'results': 'Resultados',
      'log': 'Log',
      'stop': 'Parar',
      'workflow': 'Workflow',
      'logger': {
        'error':"Ocorreu um erro, clique para ver detalhes",
        'success':"Tarefa completa, clique para ver detalhes",
        'title': "Log da execução",
        'information': "Completo. Clique duas vezes nas tarefas para ver detalhes."
      },
    },
    'results': {
      'title': '{{resource}} resultante do job',
      'backBtn': 'Voltar para resultados',
      'visualization': 'Visualização',
    }
  },
  'jobs': {
    'self': 'Jobs',
    'description': 'Lista de todos os jobs - e.g. em espera, rodando, completos, etc..',
    'searchFor': 'Pesquisar',
    'taskModal': {
      'results': 'Resultado',
      'images': 'Imagens',
      'logs': 'Logs',
      'tables': 'Tabelas',
      'params': 'Parâmetros',
    },
  },
  'datasources': {
    'self': 'Datasources',
    'description': 'Lista de todas as datasources - e.g. próprias, compartilhadas, etc..',
    'searchFor': 'Pesquisar',
    'upload': {
      'uploadDatabase': 'Carregar base',
      'chooseButton': 'Escolha o arquivo',
      'dropzone': 'Ou arraste e solte o arquivo aqui',
      'uploading': 'Carregando o arquivo: <strong>{{resource}}</strong>',
      'successMessage': 'O arquivo <strong>{{resource}}</strong> foi carregado com sucesso.',
      'errorMessage': 'Um erro ocorreu ao carregar o arquivo <strong>{{resource}}</strong>. A mensagem de erro foi: {{message}}',
    }
  },
  'datasource': {
    'self': 'Datasource',
    'edit': {
      'title': 'Editando datasource:',
      'addAttrButton': 'Novo Atributo',
    },
  },
  'visualizations': {
    'evaluate-model': {
      'self': 'Avaliação do modelo'
    },
    'table-visualization': {
      'self': 'Visualização em tabela'
    },
    'bar-chart': {
      'self': 'Gráfico de barras'
    },
    'pie-chart': {
      'self': 'Gráfico de pizza'
    },
    'line-chart': {
      'self': 'Gráfico de linhas'
    },
    'area-chart': {
      'self': 'Gráfico de área'
    },
    'summary-statistics': {
      'self': 'Estatísticas sumárias'
    },
  },
  'share': {
    'title': 'Compartilhar',
    'emptyPermissions': 'Compartilhe com outros usuários',
    'sharedUsers': 'Compartilhado com estes usuários',
    'allUsers': 'Todos os usuários',
  },
  'dashboards': {
    'self': 'Dashboards',
    'description': 'Lista de todas os Dashboards - e.g. privados, publicos, etc..',
    'searchFor': 'Buscar',
  },
  'landing-page': {
    'self': 'Página Inicial'
  },
  'home': {
    'self': 'Página Inicial'
  },
  'password': {
    'reset': {
      'submit': 'Solicitar',
      'success': 'Um email foi enviado para você!',
      'error': 'Este email'
    },
    'edit': {
      'header': 'Escolha sua nova senha.',
      'submit': 'Mudar senha',
      'success': 'Senha alterada com sucesso',
    }

  },
  'newLine': '[nova_linha]',
  'en': 'English',
  'pt': 'Português',
  'error': 'Erro',
  'interrupted': 'Interrompido',
  'pending': 'Pendente',
  'running': 'Executando',
  'waiting': 'Esperando',
  'visualize':'Visualizar',
  'canceled': 'Cancelado',
  'completed': 'Completo',
  'profile': 'Perfil',
  'logout': 'Sair',
};
