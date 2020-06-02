export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5ed5b17eb8c2543cea52b64b',
                  title: 'Sanity Studio',
                  name: 'sanity-nextjs-landing-pages-studio-9g64nmf5',
                  apiId: '35d12ef2-7a03-4d20-9a99-30dbbd795d99'
                },
                {
                  buildHookId: '5ed5b17eb63fa92d0a86dd26',
                  title: 'Landing pages Website',
                  name: 'sanity-nextjs-landing-pages-web-2rjd27g9',
                  apiId: '8ea7df59-7663-49c8-8ac0-87338cab277c'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/israelCardos/sanity-nextjs-landing-pages',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-nextjs-landing-pages-web-2rjd27g9.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page']},
      layout: {width: 'medium'}
    }
  ]
}
