package com.naichuan.polling.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Objects;

/**
 * @author Naichuan Zhang
 * 29-Aug-2020
 **/
@Entity
@Table(name = "choices")
public class Choice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 40)
    private String text;

    @ManyToOne(
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(name = "poll_id", nullable = false)
    private Poll poll;

    public Choice() {
    }

    public Choice(String text) {
        this.text = text;
    }

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

    public Poll getPoll() {
        return poll;
    }

    public void setPoll(Poll poll) {
        this.poll = poll;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Choice)) return false;
        Choice choice = (Choice) o;
        return Objects.equals(getId(), choice.getId()) &&
                Objects.equals(getText(), choice.getText()) &&
                Objects.equals(getPoll(), choice.getPoll());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getText(), getPoll());
    }
}
