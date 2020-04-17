import ApolloClient from 'apollo-boost';

export const getClient = (token?: string) => {
    return new ApolloClient({
        uri: 'https://covid19-graphql.netlify.app/',
        request: (operation) => {
            if (token) {
                operation.setContext({
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });
};
