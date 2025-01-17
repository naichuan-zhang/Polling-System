package com.naichuan.polling.payload;

/**
 * @author Naichuan Zhang
 * 29-Aug-2020
 **/
public class ChoiceResponse {
    private Long id;
    private String text;
    private Long voteCount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(Long voteCount) {
        this.voteCount = voteCount;
    }
}
