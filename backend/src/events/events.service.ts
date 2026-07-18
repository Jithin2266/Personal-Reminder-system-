import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: any, userId: string) {
    // Ensure the user exists (for local testing purposes)
    await this.prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        phone: '1234567890', // Dummy phone
        name: 'Test User'
      }
    });

    return this.prisma.event.create({
      data: {
        title: createEventDto.title,
        description: createEventDto.description,
        date: new Date(createEventDto.date),
        category: createEventDto.category,
        isRecurring: createEventDto.isRecurring,
        priority: createEventDto.priority,
        userId: userId,
      }
    });
  }

  findAll(userId: string) {
    return this.prisma.event.findMany({
      where: { userId },
      orderBy: { date: 'asc' }
    });
  }

  findOne(id: string, userId: string) {
    return this.prisma.event.findFirst({
      where: { id, userId }
    });
  }

  update(id: string, updateEventDto: any, userId: string) {
    return this.prisma.event.update({
      where: { id, userId },
      data: updateEventDto,
    });
  }

  remove(id: string, userId: string) {
    return this.prisma.event.delete({
      where: { id, userId }
    });
  }
}
