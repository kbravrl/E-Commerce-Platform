package com.example.dreamshops.enums;

public enum OrderStatus {
    PENDING("Pending"),
    PROCESSING("Processing"),
    SHIPPED("Shipped"),
    DELIVERED("Delivered"),
    CANCELLED("Cancelled");

    private final String displayName;
    OrderStatus(String displayName) {
        this.displayName = name();
    }

    public String getDisplayName() {
        return displayName;
    }
}
