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

## Local Usage

1. `yarn install`

2. `yarn start`

3. Start making queries!

## Try it out on Netlify

https://covid19-graphql.netlify.app/

## Try it out on Insomnia Rest Client

**Option 1:**

Import this `insomnia_data.json` [config](https://gist.github.com/ngshiheng/10415049ee8411a2d164d5cbd8d4a40b) file to your [Insomnia Rest Client](https://insomnia.rest/) workspace to try out this API.

**Option 2:**

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=COVID-19%20GraphQL%20API%20Server%20%F0%9F%A6%A0&uri=https%3A%2F%2Fgist.githubusercontent.com%2Fngshiheng%2F10415049ee8411a2d164d5cbd8d4a40b%2Fraw%2F86b9ac813150992886b41ff36a9ab73477418bc5%2Finsomnia_data.json)

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
