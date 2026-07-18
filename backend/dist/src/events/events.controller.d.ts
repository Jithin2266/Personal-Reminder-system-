import { EventsService } from './events.service';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: any, userId: string): Promise<any>;
    findAll(userId: string): any;
    findOne(eventId: string, userId: string): any;
    update(eventId: string, updateEventDto: any, userId: string): any;
    remove(eventId: string, userId: string): any;
}
