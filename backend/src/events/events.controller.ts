import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: any, @Headers('x-user-id') userId: string) {
    // For local testing without auth, fallback to a dummy user ID if none provided
    const id = userId || 'dummy-user-id';
    return this.eventsService.create(createEventDto, id);
  }

  @Get()
  findAll(@Headers('x-user-id') userId: string) {
    const id = userId || 'dummy-user-id';
    return this.eventsService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') eventId: string, @Headers('x-user-id') userId: string) {
    const id = userId || 'dummy-user-id';
    return this.eventsService.findOne(eventId, id);
  }

  @Patch(':id')
  update(@Param('id') eventId: string, @Body() updateEventDto: any, @Headers('x-user-id') userId: string) {
    const id = userId || 'dummy-user-id';
    return this.eventsService.update(eventId, updateEventDto, id);
  }

  @Delete(':id')
  remove(@Param('id') eventId: string, @Headers('x-user-id') userId: string) {
    const id = userId || 'dummy-user-id';
    return this.eventsService.remove(eventId, id);
  }
}
