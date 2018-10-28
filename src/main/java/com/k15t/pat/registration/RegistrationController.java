package com.k15t.pat.registration;

import com.k15t.pat.json.ApiInfo;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.StringWriter;


@RestController
public class RegistrationController {

    @Autowired private VelocityEngine velocityEngine;

    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ResponseBody
    public ApiInfo getApiInfo() {
        return new ApiInfo("Registration form API", "1.0", "Alexandr Chernov");
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
