import { Request, Response } from "express";

interface IError {
    status: number;
    message: string;
}

export class ExpressError extends Error {
    status?: number;

    constructor(message?: string, status?: number) {
        super();
        this.message = message ?? "Internal server error";
        this.status = status ?? 500;
    }
};

export function errorHandler(err: IError, req: Request, res: Response, next: any) {
    const { status = 500, message = "Something went wront" } = err;
    return res.status(status).json({ status, message });
}
