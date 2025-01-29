export const environment = {
  baseUrl: 'http://localhost:4200',
  app: {
    name: 'Taskly',
    version: '1.0.0',
    authors: [
      'Valentin FORTIN',
      'Mariam BAMBA'
    ],
  },
  translations: {
    languages: ['fr-FR', 'en-US'],
    defaultLanguage: 'fr-FR',
    reRenderOnLangChange: true
  },
  storage: {
    prefix: 'taskly',
    caseSensitive: true,
    separator: '|'
  },
  api: {
    taskly: {
      name: 'Taskly API',
      url: '',
    }
  }
}