package com.k15t.pat.json;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Visitor {
    @Id
    @GeneratedValue
    private Long id;
    private final String name;
    private final String password;
    private final String address;
    private final String email;
    private final String phone;

    public Visitor(Long id, String name, String password, String address, String email, String phone) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.address = address;
        this.email = email;
        this.phone = phone;
    }

    public Long getId() {
        return id;
    }

    public String getName() { return name; }

    public String getPassword() {
        return password;
    }

    public String getAddress() {
        return address;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }
}
