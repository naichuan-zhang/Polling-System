package com.naichuan.polling.payload;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;

/**
 * @author Naichuan Zhang
 * 29-Aug-2020
 **/
public class PollLength {
    @NotNull
    @Max(7)
    private Integer days;

    @NotNull
    @Max(23)
    private Integer hours;

    public Integer getDays() {
        return days;
    }

    public Integer getHours() {
        return hours;
    }

    public void setDays(Integer days) {
        this.days = days;
    }

    public void setHours(Integer hours) {
        this.hours = hours;
    }
}
