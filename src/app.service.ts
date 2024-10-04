import { Injectable } from '@nestjs/common';
import { BingoResponse } from './response/bingoResponse';

@Injectable()
export class AppService {
  private prevNumber: number | null = null;

  bingo(): BingoResponse {
    let randomNumber = this.generateBingoNumber();

    const prevNumber = this.getPrevNumber();

    let bingoResponse = this.checkBingo(randomNumber);

    this.setPrevNumber(randomNumber);

    return {
      bingo: bingoResponse,
      number: randomNumber,
      prevNumber: prevNumber,
    };
  }

  checkBingo(randomNumber: number) {
    const prevRandomNumber = this.getPrevNumber();

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

  generateBingoNumber() {
    const min = Math.ceil(1);
    const max = Math.floor(10);
    return Math.floor(Math.random() * (max - min) + min);
  }

  setPrevNumber(prevNumber: number) {
    this.prevNumber = prevNumber;
  }

  getPrevNumber() {
    return this.prevNumber;
  }
}
