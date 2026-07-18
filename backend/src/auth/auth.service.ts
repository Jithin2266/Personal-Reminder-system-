import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(data: any) {
    const existing = await this.prisma.user.findUnique({ where: { phone: data.phone } });
    if (existing) throw new ConflictException('Phone number already registered');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        phone: data.phone,
        name: data.name,
        password: hashedPassword,
      },
    });
    
    return { token: user.id, user: { id: user.id, name: user.name, phone: user.phone } };
  }

  async login(data: any) {
    const user = await this.prisma.user.findUnique({ where: { phone: data.phone } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return { token: user.id, user: { id: user.id, name: user.name, phone: user.phone } };
  }
}
