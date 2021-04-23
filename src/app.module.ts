import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bhhamvik1o9a4ybzsnf3-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'uwmafsen4apxvdfp',
      password: 'vcOPQnVYLVgMf1DHRc8I',
      database: 'bhhamvik1o9a4ybzsnf3',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      keepConnectionAlive: true,
    }),
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
