package com.k15t.pat.registration;

import com.k15t.pat.VisitorRepository;
import com.k15t.pat.model.ApiError;
import com.k15t.pat.model.ApiInfo;
import com.k15t.pat.model.Visitor;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@RestController
@Validated
public class RegistrationController {

    @Autowired
    VisitorRepository repository;

    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ResponseBody
    public ApiInfo getApiInfo() {
        return new ApiInfo("Registration form API", "1.0", "Alexandr Chernov");
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> registerUser(
            @RequestParam(name="name") @NotBlank(message="Name cannot be empty") String name,
            @RequestParam(name="password") @Size(min=6, message="Password should have at least 6 characters") String password,
            @RequestParam(name="address") @NotBlank(message="Address cannot be empty") String address,
            @RequestParam(name="email") @Email(message="Not a well-formed email address") @NotBlank(message="Email cannot be empty") String email,
            @RequestParam(name="phone", required=false, defaultValue="") String phone
        ) {

        List<Visitor> allVisitors = repository.findAll();
        for (int i = 0; i < allVisitors.size(); i++) {
            Visitor currentVisitor = allVisitors.get(i);
            if ((currentVisitor.getName().equals(name)) || (currentVisitor.getEmail().equals(email))) {
                HashMap<String, List<String>> errors = new HashMap<>();

                if (currentVisitor.getName().equals(name)) {
                    List<String> currentFieldErrors = new ArrayList<>();
                    currentFieldErrors.add("The visitor with the given name already exists");
                    errors.put("name", currentFieldErrors);
                }
                if (currentVisitor.getEmail().equals(email)) {
                    List<String> currentFieldErrors = new ArrayList<>();
                    currentFieldErrors.add("The visitor with the given email address already exists");
                    errors.put("email", currentFieldErrors);
                }

                return new ResponseEntity(new ApiError(HttpStatus.BAD_REQUEST, "The visitor with the given name or email address already exists", errors), HttpStatus.BAD_REQUEST);
            }
        }
        repository.save(new Visitor(name, password, address,email, phone));
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    @ResponseBody
    public List<Visitor> getAllVisitors() {
        List<Visitor> allVisitors = repository.findAll();
        return allVisitors;
    }
}
