package com.naichuan.polling.model;

import com.naichuan.polling.model.audit.DateAudit;

import javax.persistence.*;

/**
 * @author Naichuan Zhang
 * 29-Aug-2020
 **/
@Entity
@Table(
        name = "votes",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {
                        "poll_id",
                        "user_id"
                })
        }
)
public class Vote extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(name = "poll_id", nullable = false)
    private Poll poll;

    @ManyToOne(
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(name = "choice_id", nullable = false)
    private Choice choice;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Poll getPoll() {
        return poll;
    }

    public void setPoll(Poll poll) {
        this.poll = poll;
    }

    public Choice getChoice() {
        return choice;
    }

    public void setChoice(Choice choice) {
        this.choice = choice;
    }
}
