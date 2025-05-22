import { IsEnum, IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { StatusType } from '../../common/models/status.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusDto {
  @ApiProperty({
    description: 'The team ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  teamId: string;

  @ApiProperty({
    description: 'The status type',
    example: 'WORKING',
    enum: StatusType,
  })
  @IsEnum(StatusType)
  @IsNotEmpty()
  statusType: StatusType;

  @ApiProperty({
    description: 'A message describing the status',
    example: 'Working on the API implementation',
    maxLength: 200,
  })
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  message: string;
}