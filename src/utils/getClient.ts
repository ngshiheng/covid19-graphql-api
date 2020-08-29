import ApolloClient from 'apollo-boost';
import { DEV_URL, PROD_URL } from './consts';

const isDevelopment = (): Boolean => {
    return process.env.NODE_ENV === 'development';
};

export const getClient = (token?: string) => {
    return new ApolloClient({
        uri: isDevelopment() ? DEV_URL : PROD_URL,
        request: (operation) => {
            if (token) {
                operation.setContext({
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });
};
