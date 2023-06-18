import { Injectable } from '@nestjs/common';
import { Balance, Movement } from './lib/movements/types';
import { Result, validateMovements } from './lib/movements/validate-movements';

@Injectable()
export class AppService {
  validateMovements(movements: Movement[], balances: Balance[]): Result {
    return validateMovements(movements, balances);
  }
}
