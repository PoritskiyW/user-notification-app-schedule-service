import { ClientProxy } from '@nestjs/microservices';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Inject, Injectable, Logger } from '@nestjs/common';

import { UserCreatedEvent } from './events/user-created.event';

@Injectable()
export class UsersService {
  private notifyUserTimeoutMS: number;

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    @Inject('BROKER')
    private readonly broker: ClientProxy,
    private readonly logger: Logger,
  ) {
    this.notifyUserTimeoutMS =
      parseInt(process.env.USER_NOTIFICATION_TIMEOUT_MS) ||
      0;
    if (this.notifyUserTimeoutMS === 0) {
      this.logger.warn(
        'No timer duration set for user notification',
      );
    }
  }

  async handleUserCreated(data: UserCreatedEvent) {
    const callback = () => {
      this.logger.log(
        `User notification timer expired for user ID: ${data.id}`,
      );
      this.broker.emit(
        'user_notification_timer_expired',
        data,
      );
    };

    const timeout = setTimeout(
      callback,
      this.notifyUserTimeoutMS,
    );
    this.schedulerRegistry.addTimeout(
      `user_notification_timer:${data.id}`,
      timeout,
    );

    this.logger.log(
      `User notification timer set for user ID: ${data.id}`,
    );
  }
}
