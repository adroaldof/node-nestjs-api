import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { IAccessToken } from './interfaces/access-token.interface';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<IAccessToken> {
    const email = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!email) {
      this.logger.error(`Unauthorized ${authCredentialsDto.email}`);
      throw new UnauthorizedException({
        error: 'Unauthorized',
        key: 'invalid-credentials',
        message: 'Invalid credentials',
        statusCode: 401,
      });
    }

    const payload: IJwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Signed in ${email}`);

    return { accessToken };
  }
}
