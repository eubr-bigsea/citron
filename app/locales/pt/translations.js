export default {
  'main-sidebar': {
    'home': 'Início',
    'workflows': 'Fluxos',
    'jobs': 'Tarefas',
    'datasources': 'Base de dados',
    'dashboards': 'Dashboards'
  },
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
    'title': 'Parâmetros da tarefa',
    'task': {
      'name': 'Nome',
      'helper': 'Nome da tarefa que será mostrado no diagrama',
    },
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
            'alias': 'Alias',
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
    'currentPassword': {
      'label': 'Senha atual',
    },
    'newPassword': {
      'label': 'Nova senha',
    },
    'newPasswordConfirmation': {
      'label': 'Confirme a nova senha',
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
    'delimiter': {
      'label': 'Delimitadores',
    },
    'quote-char': {
      'label': 'Enclosure',
    },
    'header': {
      'label': 'Cabeçalho',
    },
    'infer-schema': {
      'label': 'Inferir esquema',
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
    'id': '#',
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
    'profile': {
      'title': "Foi atualizado",
      'message': "Suas informações foram atualizadas com sucesso.",
      'back': 'Voltar para home',
    },
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
    'delete-modal': {
      'title': {
        'one':  'Deletando "{{job.name}}"',
        'other': 'Deletando {{count}} jobs',
      },
      'message': {
        'one': 'Tem certeza que deseja remover permanentemente o job: "{{job.name}}" ?',
        'other':'Tem certeza que deseja deletar esses {{count}} jobs?',
      },
      'delete-btn': 'Delete',
      'cancel': 'Cancel'
    },
  },
  'datasources': {
    'self': 'Datasources',
    'title': 'Datasources',
    'description': 'Lista de todas as datasources - e.g. próprias, compartilhadas, etc..',
    'searchFor': 'Pesquisar',
    'edit': {
      'title': 'Editar parametetros de <strong>{{datasourceName}}</strong>',
      'save-button': 'Salvar',
      'transition-button': 'Voltar para {{route}}',
      'helpers': {
        'precision': 'Precisão',
        'treat_as_missing': 'Tratar como ausente',
        'nullable': 'Aceitar nulo',
      },
    },
    'alert-modal': {
      'inferSuccess': {
        'title': 'O Esquema foi inferido com sucesso',
        'message': 'Por favor, revise os atributos inferidos e sinta-se livre para editá-los'
      },
      'inferFailed': {
        'title': 'Falha ao inferir o esquema',
        'message': 'Um erro ocorreu durante a tentativa de inferir o esquema, o servidor respondeu com a seguinte mensagem:'
      },
      'saveSuccess': {
        'title': 'Salvo',
        'message': 'A fonte de dados foi salva com sucesso.'
      },
    },
    'upload-modal': {
      'title': 'Carregar fonte de dados',
      'uploading-header': 'Carregando arquivo: <strong>{{fileName}}</strong>',
      'dropzone-message': 'Arraste e solte seu arquivo aqui ou',
      'browse-button': 'Escolha seu arquivo',
      'success-message': 'O <strong>{{fileName}}</strong> carregado com sucesso',
      'error-message': 'Um erro ocorreu no carregamento do arquivo <strong>{{fileName}}</strong>. Servidor respondeu com:',
      'upload-more': 'Carregar um novo',
      'cancel': 'Cancelar'
    },
    'delete-modal': {
      'title': {
        'one':  'Deletando "{{datasource.name}}"',
        'other': 'Deletando {{count}} fontes de dados',
      },
      'message': {
        'one': 'Você deseja mesmo deletar de forma permanente a fonte de dados: <strong>{{datasource.name}}</strong>?',
        'other':'Você deseja deletar permanentemente <strong>{{count}}</strong> as fontes de dados?',
      },
      'delete-btn': 'Delete',
      'cancel': 'Cancel'
    },
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
    'title': 'Dashboards',
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
  'workflows': {
    'self':'workflows',
    'title': 'Workflows',
    'description': 'Lista de todos os workflows - e.g. próprios, compartilhados, etc..',
    'newBtn': 'Criar novo',
    'moreActionsBtn': 'Mais ações',
    'deleteBtn': 'Apagar todos',
    'searchFor': 'Pesquisar',
    'edit': {
      'title': 'Editando workflow:',
    },
    'create-new-modal': {
      'title': 'Criando novo workflow',
      'name': 'Meu workflow',
      'description': 'Este é o meu workflow...',
      'create': 'Criar',
      'cancel': 'Cancelar',
    },
    'edit-modal': {
      'title': 'Editando workflow',
      'name': 'Meu workflow',
      'description': 'Este é meu workflow...',
      'save': 'Salvar',
      'cancel': 'Cancelar',
    },
    'draw': {
      'executeBtn': 'Executar',
      'drawMode': 'Modo desenho',
      'drawModeTooltip': 'No modo desenho, a barra lateral principal é desativada para que você tenha uma melhor experiência montando o seu fluxo.',
    },
    'alert-modal': {
      'saveSuccess': {
        'title': 'Salvar',
        'message': 'O workflow foi salvo com sucesso.'
      },
      'saveFailed': {
        'title': 'Salvar',
        'message': 'Ocorreu um erro, o workflow não pode ser salvo.'
      },
      'deleteSuccess': {
        'title': 'Deletar',
        'message': 'O workflow foi deletado com sucesos. Você será redirecionado.'
      },
      'deleteFailed': {
        'title': 'Deletar',
        'message': 'Ocorreu um erro, o workflow não pôde ser salvo.'
      },
      'executionFailed': {
        'title':'Falha na execução',
        'message':'A execução do workflow falhou, por favor cheque as configurações do seu workflow.'
      }
    },
    'delete-modal': {
      'title': 'Deletando "{{workflow.name}}"',
      'message': 'Você deseja remover permanentemente o workflow: "{{workflow.name}}" ?',
      'delete-btn': 'Deletar',
      'cancel': 'Cancelar'
    },
    'unsaved-changes-modal': {
      'title': 'Mudanças não salvas',
      'message': "Este workflow tem mudanças que não foram salvas. Se você sair sem salvar perderá essas mudanças.",
      'save': 'Salvar e sair',
      'leave': 'Sair',
      'cancel': 'Cancelar',
    },
    'pre-execution-modal': {
      'title': 'Executar job',
      'message': 'Configurar job antes da execução.',
      'name': {
        'label': 'Nome',
      },
      'cluster': {
        'label': 'Cluster',
      },
      'runBtn': 'Executar',
      'cancel': 'Cancelar',
    }
  },
  'form-expression': {
    'buttons': {
      'save': 'Salvar',
      'cancel': 'Cancelar',
      'open-editor': 'Abir Editor',
    },
    'modal': {
      'table': {
        'expression': 'Expressão',
        'alias': 'Alias',
      },
      'buttons': {
        'add': 'Adicionar nova expressão'
      },
    }
  },
};
