import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({
    summary: 'This API accept username,password and returns a JWT_TOKEN',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ description: 'return a JWT token' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
