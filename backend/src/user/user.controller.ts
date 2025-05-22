import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  getCurrentUser(@CurrentUser() user) {
    return this.userService.getUserProfile(user.id);
  }

  @Get('teams')
  @ApiOperation({ summary: 'Get teams for current user' })
  getUserTeams(@CurrentUser() user) {
    return this.userService.getUserTeams(user.id);
  }
}