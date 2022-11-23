import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { StorefrontsModule } from './storefronts/storefronts.module';

const GraphQL = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: './schema.gql',
  debug: true,
  playground: true,
});

const TypeOrm = TypeOrmModule.forRoot({
  keepConnectionAlive: true,
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'reef',
  autoLoadEntities: true,
  synchronize: true,
});

@Module({
  imports: [GraphQL, TypeOrm, StorefrontsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
