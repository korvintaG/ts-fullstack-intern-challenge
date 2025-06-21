import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LikesModule } from './likes/likes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './likes/entities/like.entity';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    envFilePath: '.env',
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        type: 'postgres',
        host: configService.get('DATABASE_HOST') || 'cat-pinterest-api-pg',
        port: configService.get('DATABASE_PORT') || 5432,
        username: configService.get('DATABASE_USERNAME') || 'postgres',
        password: configService.get('DATABASE_PASSWORD') || '1',
        database: configService.get('DATABASE_NAME') || 'support_lk_db',
        entities: [Like, User],
        synchronize: true,
      }
    }
  }), 
  LikesModule, 
  UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
