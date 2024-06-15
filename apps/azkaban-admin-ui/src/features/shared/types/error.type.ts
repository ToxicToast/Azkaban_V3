export type HttpError = {
    data: {
        statusCode: number;
        message: string;
    };
    status: number;
};
