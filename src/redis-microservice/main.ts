// import { NestFactory } from '@nestjs/core';
// import { RedisMicroserviceModule } from './redis-microservice.module';
// import { Transport } from '@nestjs/microservices';
//
// async function bootstrap() {
//   const app = await NestFactory.createMicroservice(RedisMicroserviceModule, {
//     transport: Transport.REDIS,
//     options: {
//       url: 'redis://localhost:6379',
//     },
//   });
//   app.listen(() => console.log('Redis microservice is listening'));
// }
//
// bootstrap();
