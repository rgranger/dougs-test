import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { Balance, Movement } from './lib/movements/types';
import { validateBody } from './lib/movements/validation-schema';
import { unreachable } from './lib/unreachable';

type MovementValidationBody = {
  movements: Movement[];
  balances: Balance[];
};

@Controller('movements')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('validation')
  validateMovements(
    @Res({ passthrough: true }) res: Response,
    @Body() body: MovementValidationBody,
  ) {
    if (!validateBody(body)) {
      res.status(HttpStatus.BAD_REQUEST);
      return { message: 'Invalid payload', reasons: validateBody.errors };
    }

    const result = this.appService.validateMovements(
      body.movements,
      body.balances,
    );

    switch (result.type) {
      default:
        return unreachable(result);

      case 'Success':
        res.status(HttpStatus.ACCEPTED);
        return { message: 'Accepted' };

      case 'Error':
        res.status(HttpStatus.I_AM_A_TEAPOT);
        return { message: "I'm a teapot", reasons: result.reasons };
    }
  }
}
