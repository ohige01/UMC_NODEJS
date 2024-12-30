export class NotFoundError extends Error {
    statusCode = 400;
    errorCode = "4001_DATA_NOT_FOUND";
    reason: string;
    data: string;

    constructor(reason: string, data: any) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicateUserEmailError extends Error {
    statusCode = 400;
    errorCode = "4002_USER_DUPLICATE";
    reason: string;
    data: string;

    constructor(reason: string, data: any) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class InvalidDate extends Error {
    statusCode = 400;
    errorCode = "4003_INVALID_DATE";
    reason: string;
    data: string;

    constructor(reason: string, data: any) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class InvalidMission extends Error {
    statusCode = 400;
    errorCode = "4004_INVALID_MISSION";
    reason: string;
    data: string;

    constructor(reason: string, data: any) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}