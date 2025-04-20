export interface RegisterUserResponse {
    message: string;
    user: {
        _id: string;
        username: string;
        score: number;
        totalQuestions: number;
    };
}