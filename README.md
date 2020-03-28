# COVID-19 GraphQL API Server 🦠

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

## Source

-   https://github.com/novelcovid/api

## Stacks

-   [graphql](https://graphql.org/)
-   [apollo-server-lambda](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-lambda)
-   [typescript](https://www.typescriptlang.org/)

## Local Usage

1. `yarn install`

2. `yarn start`

3. Start making queries!

## Tryout on Netlify

WIP

### Example queries

Returns data of all countries that has COVID-19

```graphql
{
    countries {
        country
        countryInfo {
            _id
            lat
            long
            flag
            iso3
            iso2
        }
        result {
            cases
            todayCases
            deaths
            todayDeaths
            recovered
            active
            critical
            casesPerOneMillion
            deathsPerOneMillion
        }
    }
}
```

Returns data of a specific country.

```graphql
{
    country(name: "malaysia") {
        country
        result {
            cases
            deaths
            todayCases
            todayDeaths
        }
    }
}
```

Returns all United States of America and their Corona data

```graphql
{
    states {
        state
        result {
            cases
            deaths
        }
    }
}
```
