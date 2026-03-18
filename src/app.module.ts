import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserModule } from './user/user.module';
import { OcrModule } from './ocr/ocr.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // UserModule,
    OcrModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nest_demo',
      autoLoadEntities: true, // 自动加载实体
      synchronize: true, // 开发环境用，自动建表
    }),
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局模块，这样在其他 Service 中不需要重复导入
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
