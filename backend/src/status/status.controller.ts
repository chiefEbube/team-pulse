import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateStatusDto } from './dto/create-status.dto';
import { StatusService } from './status.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('status')
@Controller('status')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  @ApiOperation({ summary: 'Create or update user status' })
  async createStatus(
    @Body() createStatusDto: CreateStatusDto,
    @CurrentUser() user,
  ) {
    // Check if user is a member of the team
    const canAccess = await this.statusService.canAccessTeam(
      user.id,
      createStatusDto.teamId,
    );

    if (!canAccess) {
      throw new ForbiddenException('You are not a member of this team');
    }

    return this.statusService.createStatus(
      user.id,
      createStatusDto,
    );
  }

  @Get('team/:teamId')
  @ApiOperation({ summary: 'Get all statuses for a team' })
  @ApiParam({ name: 'teamId', description: 'The team ID' })
  async getTeamStatuses(
    @Param('teamId') teamId: string,
    @CurrentUser() user,
  ) {
    // Check if user is a member of the team
    const canAccess = await this.statusService.canAccessTeam(
      user.id,
      teamId,
    );

    if (!canAccess) {
      throw new ForbiddenException('You are not a member of this team');
    }

    return this.statusService.getTeamStatuses(teamId);
  }
}