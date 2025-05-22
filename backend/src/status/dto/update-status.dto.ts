import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { StatusType } from '../../common/models/status.model';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
  @ApiProperty({
    description: 'The status type',
    example: 'WORKING',
    enum: StatusType,
    required: false,
  })
  @IsEnum(StatusType)
  @IsOptional()
  statusType?: StatusType;

  @ApiProperty({
    description: 'A message describing the status',
    example: 'Working on the API implementation',
    maxLength: 200,
    required: false,
  })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  message?: string;
}