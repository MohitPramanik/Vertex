import { ExpressError } from "../utils/ExpressError";

export const validateSchema = (obj: any, schema: any) => {
    const { error, value } = schema.validate(obj);

    if (error) {
        throw new ExpressError(error.message, 400);
    }

    return value;
}