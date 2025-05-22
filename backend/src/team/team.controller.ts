import {
  Controller,
  Post,
  Body,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateTeamDto } from './dto/create-team.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { TeamService } from './team.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('team')
@Controller('team')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new team (admin only)' })
  createTeam(
    @Body() createTeamDto: CreateTeamDto,
    @CurrentUser() user,
  ) {
    return this.teamService.createTeam(user.id, createTeamDto);
  }

  @Post('invite')
  @ApiOperation({ summary: 'Invite a user to a team (admin only for their teams)' })
  async inviteUser(
    @Body() inviteUserDto: InviteUserDto,
    @CurrentUser() user,
  ) {
    // Check if user is an admin of the team
    const isTeamAdmin = await this.teamService.isTeamAdmin(
      user.id,
      inviteUserDto.teamId,
    );

    if (!isTeamAdmin) {
      throw new ForbiddenException('You must be a team admin to invite users');
    }

    return this.teamService.inviteUser(inviteUserDto);
  }
}