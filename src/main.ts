import { NestFactory } from '@nestjs/core';
import {Logger} from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config'

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get("server")
  const {NODE_ENV,PORT} = process.env
  
  if(NODE_ENV==="development"){
    app.enableCors()
    logger.debug(`Enable CORS in development. NODE_ENV=${NODE_ENV}`)
  }else{
    app.enableCors({origin:serverConfig.origin})
    logger.log(`Accept cors from ${serverConfig.origin}`)
  }

  const port = PORT || serverConfig.port
  await app.listen(port);
  logger.log(`App start on ${port} port`)
}
bootstrap();
