# COVID-19 GraphQL API Server 🦠

[![Netlify Status](https://api.netlify.com/api/v1/badges/d9179aaa-940e-4bed-a029-a1621426c21b/deploy-status)](https://app.netlify.com/sites/covid19-graphql/deploys)
[![CircleCI](https://circleci.com/gh/ngshiheng/covid19-graphql-api.svg?style=shield)](https://circleci.com/gh/ngshiheng/covid19-graphql-api/tree/master)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/ngshiheng/covid19-graphql-api/blob/master/LICENSE)

```
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⡟⢉⠁⠈⡻⠘⠏⠀⠹⢛⣷⠄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣰⡞⢿⡄⠀⢻⡴⣇⣀⣷⣴⢄⢀⡖⡾⠁⢀⣼⢛⣦⠀⠀⠀⠀⠀
⠀⠀⠀⣠⣄⠈⠙⢦⣿⣶⠞⠋⠉⠁⣀⣄⡀⠉⠙⠻⢦⣾⣵⠟⠉⢠⣄⠀⠀⠀
⠀⠀⢰⣯⣙⠷⣄⡴⠋⣤⣤⣤⠀⢸⡏⢉⣿⠀⣠⡤⣤⡘⢷⣤⡴⣛⣹⣧⠀⠀
⠀⢀⣄⠀⠉⢛⡿⠁⠘⣧⣀⣼⠃⠀⠙⠛⠁⠀⢿⣄⣸⠇⠀⢹⡟⠉⠁⢀⣄⠀
⠀⡾⡙⣛⣳⣾⠁⠀⡀⣀⠉⠀⠀⠀⣀⣀⠀⠀⠀⠉⢁⡀⡀⠀⢿⣶⣛⣋⣻⠀
⠀⠉⠈⠉⠈⡹⠀⠸⠁⠙⣷⠀⠀⢸⡏⠉⣷⠀⠀⢰⠉⠈⣣⠀⠸⡉⠉⠉⠉⠀
⠀⣿⠛⣛⣻⣿⠀⠈⠛⠙⠁⠀⠀⠈⠛⠛⠁⠀⠀⠀⠙⠛⠉⠀⣼⣽⣛⡛⣹⠀
⠀⠘⠟⠉⠁⣘⣧⠀⢀⡶⠛⢶⡂⠀⢀⣀⠀⠀⣴⠟⢳⡄⠀⢰⣏⠀⠉⠙⠛⠀
⠀⠀⢰⡶⢛⣭⠟⢧⡈⠷⠶⠾⠁⢰⡏⠙⣷⠀⠻⢦⠾⢃⣴⠿⢯⣛⢳⡶⠀⠀
⠀⠀⠀⠻⠟⠁⢀⡴⣿⢶⣄⡀⠀⠈⠛⠚⠋⠀⢀⣠⡴⣾⢷⣄⠀⠹⠟⠁⠀⠀
⠀⠀⠀⠀⠀⢺⣏⣴⠏⠀⣸⠟⠝⠓⠶⠶⠖⠛⠛⣯⠀⠘⢷⣙⡿⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠉⠀⣶⣏⣬⠁⠀⣥⢠⠆⠀⣰⣘⣷⠄⠈⠉⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠀⠘⠳⠾⠛⠀⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
```

## Motive

Front-end web and mobile developers often eager to reap the developer efficiency gains offered by [GraphQL](https://graphql.org/) but they have years of momentum behind their REST API. This project aims to serve as an example of how you can easily build a GraphQL endpoint atop of an [existing REST API](https://github.com/disease-sh/API).

## Stacks

-   [graphql](https://graphql.org/)
-   [apollo-server-lambda](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-lambda)
-   [typescript](https://www.typescriptlang.org/)
-   [type-graphql](https://typegraphql.com/)
-   [disease-sh-api](https://github.com/disease-sh/API)
-   [sentry](https://sentry.io/)

## Local Usage

### Without Netlify

1. `yarn install`

2. `yarn start:dev`

3. Start making queries!

### With Netlify

1. `netlify build`

2. `netlify dev`

3. Start making queries!

## Try it out on Netlify

https://covid19-graphql.netlify.app/

## Tests

1. To run test suites locally, make sure your `NODE_ENV` is set to `development`.
1. Run `yarn start` to start local development server
1. Finally, run `yarn test` to run the tests

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change

### Steps

1. Fork this
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Donating

<a href="https://www.buymeacoffee.com/jerryng" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-black.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>
