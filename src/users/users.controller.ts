import { Controller, Logger } from '@nestjs/common';
import {
  Payload,
  EventPattern,
} from '@nestjs/microservices';

import { UsersService } from './users.service';
import { UserCreatedEvent } from './events/user-created.event';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger,
  ) {}

  @EventPattern('user_created')
  async handleUserCreated(
    @Payload() data: UserCreatedEvent,
  ) {
    try {
      this.logger.log(
        'Received user created event',
        JSON.stringify(data),
      );
      await this.usersService.handleUserCreated(data);
      this.logger.log(
        'User created event handled successfully.',
      );
    } catch (error) {
      this.logger.error(
        `Error handling user created event: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
