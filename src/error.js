export class NotFoundError extends Error {
    statusCode = 400;
    errorCode = "4001_DATA_NOT_FOUND";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicateUserEmailError extends Error {
    statusCode = 400;
    errorCode = "4002_USER_DUPLICATE";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class InvalidDate extends Error {
    statusCode = 400;
    errorCode = "4003_INVALID_DATE";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class InvalidMission extends Error {
    statusCode = 400;
    errorCode = "4004_INVALID_MISSION";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}