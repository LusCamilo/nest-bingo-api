import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BingoResponse } from './response/bingoResponse';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  GetBingo(): BingoResponse {
    return this.appService.Bingo();
  }
}
