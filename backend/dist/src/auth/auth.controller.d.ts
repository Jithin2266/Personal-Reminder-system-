import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
        token: any;
        user: {
            id: any;
            name: any;
            phone: any;
        };
    }>;
    login(body: any): Promise<{
        token: any;
        user: {
            id: any;
            name: any;
            phone: any;
        };
    }>;
}
