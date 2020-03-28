import { ApolloServer } from 'apollo-server';
import { resolve } from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';

export const createLocalServer = async () => {
    const schema = await buildSchema({
        resolvers: [__dirname + '/resolvers/**/*.{ts,js}'],
        emitSchemaFile: resolve(__dirname, 'schemas/schema.gql'),
    });
    const server = new ApolloServer({
        schema,
        playground: true,
        // uploads: false,
    });
    await server.listen(process.env.PORT);
    console.log(`😷 Server is running on http://localhost:${process.env.PORT}`);
};

createLocalServer().catch(console.error);
