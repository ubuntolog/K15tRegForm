package com.k15t.pat.registration;

import com.k15t.pat.json.ApiError;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@ControllerAdvice
@Component
public class RegistrationExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        HashMap<String, List<String>> errors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            List<String> currentFieldErrors = errors.get(error.getField());
            currentFieldErrors.add(error.getDefaultMessage());
            errors.put(error.getField(), currentFieldErrors);
        }
        for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
            List<String> currentFieldErrors = errors.get(error.getObjectName());
            currentFieldErrors.add(error.getDefaultMessage());
            errors.put(error.getObjectName(), currentFieldErrors);
        }

        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors);
        return handleExceptionInternal(ex, apiError, headers, apiError.getStatus(), request);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(
            MissingServletRequestParameterException ex,
            HttpHeaders headers,
            HttpStatus status, WebRequest request) {
        HashMap<String, List<String>> errors = new HashMap<>();
        errors.put(ex.getParameterName(),new ArrayList<String>(Arrays.asList("Parameter is missing")));
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors);
        return new ResponseEntity<Object>(apiError, new HttpHeaders(), apiError.getStatus());
    }

    @ExceptionHandler({ ConstraintViolationException.class })
    public ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException ex, WebRequest request) {
        HashMap<String, List<String>> errors = new HashMap<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            List<String> currentFieldErrors = new ArrayList<String>();
            currentFieldErrors.add(violation.getMessage());

            String field = "";
            for (Path.Node node : violation.getPropertyPath()) {
                switch (node.getName()) {
                    case "arg0":  field = "name";
                        break;
                    case "arg1":  field = "password";
                        break;
                    case "arg2":  field = "address";
                        break;
                    case "arg3":  field = "email";
                        break;
                    case "arg4":  field = "phone";
                        break;
                    default: field = "other";
                        break;
                }
            }
            errors.put(field, currentFieldErrors);
        }

        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors);
        return new ResponseEntity<Object>(apiError, new HttpHeaders(), apiError.getStatus());
    }

    @ExceptionHandler({ MethodArgumentTypeMismatchException.class })
    public ResponseEntity<Object> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex, WebRequest request) {
        HashMap<String, List<String>> errors = new HashMap<>();
        errors.put(ex.getName(),new ArrayList<String>(Arrays.asList("Should be of type" + ex.getRequiredType().getName())));
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors);
        return new ResponseEntity<Object>(apiError, new HttpHeaders(), apiError.getStatus());
    }
}