package com.ssafy.project.exception;

public class OverLimitPartyCountException extends RuntimeException {
    public OverLimitPartyCountException(String message) {
        super(message);
    }
}
