import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    register(data: any): Promise<{
        token: any;
        user: {
            id: any;
            name: any;
            phone: any;
        };
    }>;
    login(data: any): Promise<{
        token: any;
        user: {
            id: any;
            name: any;
            phone: any;
        };
    }>;
}
