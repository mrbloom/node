import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FormRepository } from 'src/forms/form.repository';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([FormRepository]),
    AuthModule,
  ],
  controllers: [FormsController],
  providers: [FormsService]
})
export class FormsModule {}
