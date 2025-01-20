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
    languages: ['fr', 'en'],
    defaultLanguage: 'fr',
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
      url: 'http://localhost:8000/api',
    }
  }
}