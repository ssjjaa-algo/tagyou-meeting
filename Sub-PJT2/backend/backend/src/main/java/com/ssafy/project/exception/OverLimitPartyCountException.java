package com.ssafy.project.exception;

public class OverLimitPartyCountException extends RuntimeException {
    public OverLimitPartyCountException() {
        super();
    }

    public OverLimitPartyCountException(String message) {
        super(message);
    }

    public OverLimitPartyCountException(String message, Throwable cause) {
        super(message, cause);
    }

    public OverLimitPartyCountException(Throwable cause) {
        super(cause);
    }
}
