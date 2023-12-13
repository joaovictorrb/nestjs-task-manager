import { 
    ConflictException, 
    Inject, 
    Injectable, 
    InternalServerErrorException, 
    UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
    ) {}

    async signUp(input: AuthCredentialsDto): Promise<void> {
        try {
            const {username, password} = input;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await this.userRepository.create({
                username,
                password: hashedPassword
            });

            await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') throw new ConflictException('Username already exists');
            throw new InternalServerErrorException();
        }
    }

    async signIn(input: AuthCredentialsDto): Promise<{accessToken: string}> {
        const {username, password} = input;
        const hasUser = await this.userRepository.findOneBy({username});
        
        if(hasUser && (await bcrypt.compare(password, hasUser.password))) {
            const payload: JwtPayload = {username};
            const accessToken: string = await this.jwtService.sign(payload)
            return {accessToken};
        }

        throw new UnauthorizedException('Username or password mismatch');
    }
}