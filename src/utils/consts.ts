// https://github.com/novelcovid/api
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
`;

export const DEFAULT_QUERY_COUNTRY = `# Returns data of a specific country
{
    country(name:"Malaysia") {
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
`;

export const DEFAULT_QUERY_STATES = `# Returns data of all United States of America
{
    states {
        state
        result {
            cases
            todayCases
            deaths
            todayDeaths
            active
        }
    }
}
`;
