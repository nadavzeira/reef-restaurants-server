import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { CouponsModule } from './coupons/coupons.module';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { OrdersModule } from './orders/orders.module';
import { StorefrontsModule } from './storefronts/storefronts.module';
import { HealthModule } from './health/health.module';

dotenv.config();

const GraphQL = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: './schema.gql',
  debug: true,
  playground: true,
});

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  keepConnectionAlive: true,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  synchronize: true,
};

const TypeOrm = TypeOrmModule.forRoot(typeOrmModuleOptions);

@Module({
  imports: [
    GraphQL,
    TypeOrm,
    HealthModule,
    StorefrontsModule,
    MenuItemsModule,
    OrdersModule,
    CouponsModule,
  ],
})
export class AppModule {}
