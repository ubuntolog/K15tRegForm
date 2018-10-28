package com.k15t.pat.json;

public class User {

    private final String name;
    private final String password;
    private final String address;
    private final String email;
    private final String phone;

    public User(String name, String password, String address, String email, String phone) {
        this.name = name;
        this.password = password;
        this.address = address;
        this.email = email;
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

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
