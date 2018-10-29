package com.k15t.pat.registration;

import com.k15t.pat.json.ApiInfo;
import com.k15t.pat.json.User;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.constraints.Size;
import java.io.StringWriter;


@RestController
@Validated
public class RegistrationController {

    @Autowired private VelocityEngine velocityEngine;

    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ResponseBody
    public ApiInfo getApiInfo() {
        return new ApiInfo("Registration form API", "1.0", "Alexandr Chernov");
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    @ResponseBody
    public User registerUser(
            @RequestParam(name="name") @NotBlank(message="Name cannot be empty") String name,
            @RequestParam(name="password") @Size(min=6, message="Password should have at least 6 characters") String password,
            @RequestParam(name="address") @NotBlank(message="Address cannot be empty") String address,
            @RequestParam(name="email") @Email(message="Not a well-formed email address") @NotBlank(message="Email cannot be empty") String email,
            @RequestParam(name="phone", required=false, defaultValue="") String phone
        ) {

        return new User(name, password, address, email, phone);
    }

    @RequestMapping("/registration.html")
    public String registration() {

        Template template = velocityEngine.getTemplate("templates/registration.vm");
        VelocityContext context = new VelocityContext();
        StringWriter writer = new StringWriter();
        template.merge(context, writer);

        return writer.toString();
    }
}
