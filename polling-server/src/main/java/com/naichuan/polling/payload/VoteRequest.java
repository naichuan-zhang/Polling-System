package com.naichuan.polling.payload;

import com.sun.istack.NotNull;

/**
 * @author Naichuan Zhang
 * 29-Aug-2020
 **/
public class VoteRequest {
    @NotNull
    private Long choiceId;

    public Long getChoiceId() {
        return choiceId;
    }

    public void setChoiceId(Long choiceId) {
        this.choiceId = choiceId;
    }
}
