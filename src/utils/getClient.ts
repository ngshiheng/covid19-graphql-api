import ApolloClient from 'apollo-boost';

export const getClient = (token?: string) => {
    return new ApolloClient({
        uri: 'http://localhost:4000/',
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
