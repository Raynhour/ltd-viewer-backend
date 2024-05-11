import { Module } from '@nestjs/common';
import { HttpWrapperService } from './http-wrapper.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [HttpWrapperService],
  exports: [HttpWrapperService]
})
export class HttpWrapperModule {}
