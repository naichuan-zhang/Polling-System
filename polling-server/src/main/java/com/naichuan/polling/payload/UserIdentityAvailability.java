package com.naichuan.polling.payload;

/**
 * @author Naichuan Zhang
 * 29-Aug-2020
 **/
public class UserIdentityAvailability {
    private Boolean available;

    public UserIdentityAvailability(Boolean available) {
        this.available = available;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}
