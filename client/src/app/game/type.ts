export interface RandomDestinationResponse {
    clues: string[];
    options: string[];
    id: string;
}

export interface AnswerResponse {
    correct: boolean;
    emoji: string;
    correct_city: string;
    fun_fact: string;
    updatedScore: number;
    totalQuestions: number;
}

export interface ScoreResponse {
    username: string;
    score: number;
    totalQuestions: number;
}

export interface RegisterUserResponse {
    message: string;
    user: {
        _id: string;
        username: string;
        score: number;
        totalQuestions: number;
    };
}