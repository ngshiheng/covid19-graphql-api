export const DATA_SOURCE_URL = 'https://corona.lmao.ninja';

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
        result {
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
        result {
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
            active
            tests
            cases
            todayCases
            deaths
            todayDeaths
            testsPerOneMillion
        }
    }
}
`;

export const DEFAULT_QUERY_STATE = `# Returns data of a specific state in the United States of America
{
    state(name: "New York") {
        state
        result {
            active
            tests
            testsPerOneMillion
            cases
            todayCases
            deaths
            todayDeaths
        }
    }
}
`;

export const DEFAULT_QUERY_COUNTRY_WITH_MOST_DEATHS = `# Returns data sort by country with the most deaths
{
    countries(sortBy: deaths) {
        country
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
        updated
    }
}
`;
