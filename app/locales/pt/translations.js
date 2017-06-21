export default {
  'notFound': {
    'message': 'O {{resource}} que você está procurando não está disponível',
    'goBack': 'Voltar para'
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
    'yourProfile': 'Seu perfil',
  },
  'tables': {
    'id': 'ID',
    'logo': 'Logo',
    'name': 'Nome',
    'author': 'Autor',
    'updated': 'Atualizado em',
    'status': 'Status',
    'result': 'Resultado',
    'options': 'Opções',
    'created': 'Criado em'
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
      }
    },
    'save': {
      'workflow': {
        'success': 'O workflow foi salvo.',
        'error': 'Houve um erro, o workflow não foi salvo.'
      }
    },
  },
  'modal': {
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
    'default': {
      'title': 'Aviso',
      'message': 'Você tem certeza disso?',
      'cancelButton': 'Cancelar',
      'submitButton': 'Ok',
    },
  },
  'workflow': {
    'self': 'workflow',
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
      'results': 'Resultados',
      'log': 'Log',
      'stop': 'Parar',
      'workflow': 'Workflow',
      'logger': {
        'title': "Log da execução",
      },
    },
    'results': {
      'title': '{{resource}} resultante do job',
      'backBtn': 'Voltar para resultados',
      'visualization': 'Visualização',
    }
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
