package com.k15t.pat.registration;

import com.k15t.pat.ApplicationBootstrap;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {ApplicationBootstrap.class})
@WebAppConfiguration

public class RegistrationControllerTests {
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() throws Exception {
        mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void getApiInfoTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/info"))
                .andExpect(status().isOk());
    }

    @Test
    public void registerUserTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/user")
                .param("name", "John Smith")
                .param("password", "passw0rd")
                .param("address", "Baker street 221b")
                .param("email", "john@smith.com")
                .param("phone", "12345678"))
                .andExpect(status().isCreated());
    }

    @Test
    public void getAllVisitorsTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/user"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8));
    }
}
