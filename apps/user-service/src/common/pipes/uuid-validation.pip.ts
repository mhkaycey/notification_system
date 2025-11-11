import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class UuidValidationPipe implements PipeTransform<string> {
  transform(value: string) {
    if (!isUUID(value, 4)) {
      throw new BadRequestException(
        'Invalid user ID. Please provide a valid user ID.',
      );
    }
    return value;
  }
}
