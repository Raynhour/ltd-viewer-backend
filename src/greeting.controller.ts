import { Controller, Get } from '@nestjs/common';

@Controller()
export class GreetingController {
    @Get('greeting')
    getGreeting(): { test: number } {
      return { test: 123 };
    }
}
