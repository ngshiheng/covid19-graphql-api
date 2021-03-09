export const DEV_URL = 'http://localhost:4000';

export const PROD_URL = 'https://covid19-graphql.netlify.app/';

export const DATA_SOURCE_URL = 'https://disease.sh/v3';

export const SENTRY_DSN =
    'https://a992c0706ba0469c94a0848832d057bf@o545253.ingest.sentry.io/5667425';

export const DEFAULT_QUERY_COUNTRIES = `# Returns data of all countries that has COVID-19
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
        continent
        result {
            population
            tests
            cases
            todayCases
            deaths
            todayDeaths
            recovered
            active
            critical
            casesPerOneMillion
            deathsPerOneMillion
            testsPerOneMillion
            activePerOneMillion
            recoveredPerOneMillion
            criticalPerOneMillion
            updated
        }
    }
}
`;

export const DEFAULT_QUERY_COUNTRY = `# Returns data of a specific country
# Note that 'name:"<argument>"' argument could be: <country> || <_id> || <iso2> || <iso3>
{
    country(name:"Malaysia") {
        country
        countryInfo {
            _id
            lat
            long
            flag
            iso2
            iso3
        }
        continent
        result {
            population
            tests
            cases
            todayCases
            deaths
            todayDeaths
            recovered
            active
            critical
            casesPerOneMillion
            deathsPerOneMillion
            testsPerOneMillion
            activePerOneMillion
            recoveredPerOneMillion
            criticalPerOneMillion
            updated
        }
    }
}
`;

export const DEFAULT_QUERY_STATES = `# Returns data by states in the United States of America
{
    states {
        state
        result {
            population
            active
            tests
            cases
            todayCases
            deaths
            todayDeaths
            casesPerOneMillion
            deathsPerOneMillion
            testsPerOneMillion
            updated
        }
    }
}
`;

export const DEFAULT_QUERY_STATE = `# Returns data of a specific state in the United States of America
{
    state(name: "New York") {
        state
        result {
            population
            active
            tests
            cases
            todayCases
            deaths
            todayDeaths
            casesPerOneMillion
            deathsPerOneMillion
            testsPerOneMillion
            updated
        }
    }
}
`;

export const DEFAULT_QUERY_COUNTRY_WITH_MOST_DEATHS = `# Returns data sort by country with the most deaths
{
    countries(sortBy: deaths) {
        country
        continent
        result {
            active
            deaths
            todayDeaths
            deathsPerOneMillion
            updated
        }
    }
}
`;

export const DEFAULT_QUERY_COUNTRY_WITH_MOST_CASES = `# Returns data sort by country with the most cases
{
    countries(sortBy: cases) {
        country
        continent
        result {
            active
            cases
            todayCases
            deathsPerOneMillion
            updated
        }
    }
}
`;

export const DEFAULT_QUERY_GLOBAL = `# Returns global data
{
    globalTotal {
        population
        affectedCountries
        tests
        cases
        todayCases
        deaths
        todayDeaths
        recovered
        active
        critical
        casesPerOneMillion
        deathsPerOneMillion
        testsPerOneMillion
        activePerOneMillion
        recoveredPerOneMillion
        criticalPerOneMillion
        updated
    }
}
`;
