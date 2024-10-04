import { Injectable } from '@nestjs/common';
import { BingoResponse } from './response/bingoResponse';

@Injectable()
export class AppService {
  private prevNumber: number | null = null;

  Bingo(): BingoResponse {
    let randomNumber = this.GenerateBingoNumber();

    const prevNumber = this.GetPrevNumber();

    let bingoResponse = this.CheckBingo(randomNumber);

    this.SetPrevNumber(randomNumber);

    return {
      Bingo: bingoResponse,
      Number: randomNumber,
      PrevNumber: prevNumber,
    };
  }

  CheckBingo(randomNumber: number) {
    const prevRandomNumber = this.GetPrevNumber();

    if (prevRandomNumber != null) {
      const numberResult = randomNumber - prevRandomNumber;

      if (numberResult < 3) {
        return false;
      }

      for (let i = 2; i < numberResult; i++) {
        if (numberResult % i == 0) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  GenerateBingoNumber() {
    const min = Math.ceil(1);
    const max = Math.floor(10);
    return Math.floor(Math.random() * (max - min) + min);
  }

  SetPrevNumber(PrevNumber: number) {
    this.prevNumber = PrevNumber;
  }

  GetPrevNumber() {
    return this.prevNumber;
  }
}
