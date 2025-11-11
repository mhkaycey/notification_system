// decorators/is-enum-safe.decorator.ts
import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsEnumSafe(
  entity: object,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isEnumSafe',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return Object.values(entity).includes(value);
        },
        defaultMessage() {
          return `${propertyName} must be one of: ${Object.values(entity).join(', ')}`;
        },
      },
    });
  };
}
