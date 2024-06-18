// import { Injectable } from '@nestjs/common';
// import {
//   ClientProxyFactory,
//   Transport,
//   ClientGrpcProxy,
// } from '@nestjs/microservices';
// import { ConfigService } from '@nestjs/config';
//
// @Injectable()
// export class RedisMicroserviceService {
//   private client: ClientGrpcProxy;
//
//   constructor(private configService: ConfigService) {
//     this.client = ClientProxyFactory.create({
//       transport: Transport.REDIS,
//       options: {
//         url: `redis://${this.configService.get('REDIS_HOST')}:${this.configService.get('REDIS_PORT')}`,
//       },
//     });
//   }
//
//   getClient() {
//     return this.client;
//   }
// }
