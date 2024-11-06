export class NotFoundError extends Error {
    errorCode = "4001_DATA_NOT_FOUND";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicateUserEmailError extends Error {
    errorCode = "4002_USER_DUPLICATE";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class InvalidDate extends Error {
    errorCode = "4002_INVALID_DATE";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class InvalidMission extends Error {
    errorCode = "4002_INVALID_MISSION";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}