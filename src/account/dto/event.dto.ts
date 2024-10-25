import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class EventDto {
  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @IsOptional()
  @IsString()
  readonly destination: string;

  @IsOptional()
  @IsString()
  readonly origin: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;
}