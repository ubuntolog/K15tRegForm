package com.k15t.pat.json;

import org.springframework.http.HttpStatus;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class ApiError {

    private HttpStatus status;
    private String message;
    private HashMap<String, List<String>> errors;

    public ApiError(HttpStatus status, String message, HashMap<String, List<String>> errors) {
        super();
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    public ApiError(HttpStatus status, String message, String field, String error) {
        super();
        this.status = status;
        this.message = message;
        List<String> currentFiledErrors = errors.get(field);
        currentFiledErrors.add(error);
        errors.put(field, currentFiledErrors);
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public HashMap<String, List<String>>  getErrors() {
        return errors;
    }
}