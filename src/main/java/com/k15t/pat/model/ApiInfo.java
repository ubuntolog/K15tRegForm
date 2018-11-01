package com.k15t.pat.model;

public class ApiInfo {
    private final String name;
    private final String version;
    private final String author;

    public ApiInfo(String name, String version, String author) {
        this.name = name;
        this.version = version;
        this.author = author;
    }

    public String getName() {
        return name;
    }

    public String getVersion() {
        return version;
    }

    public String getAuthor() {
        return author;
    }
}
