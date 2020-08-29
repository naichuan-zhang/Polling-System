package com.naichuan.polling.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * @author Naichuan Zhang
 * 29-Aug-2020
 **/
public class ChoiceRequest {
    @NotBlank
    @Size(max = 40)
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
