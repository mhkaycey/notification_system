import { IsObject, IsNotEmpty } from 'class-validator';

export class Render_templat_dto {
  @IsObject()
  @IsNotEmpty()
  data!: Record<string, any>;
}
