import { PrismaService } from '../prisma/prisma.service';
export declare class EventsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createEventDto: any, userId: string): Promise<any>;
    findAll(userId: string): any;
    findOne(id: string, userId: string): any;
    update(id: string, updateEventDto: any, userId: string): any;
    remove(id: string, userId: string): any;
}
