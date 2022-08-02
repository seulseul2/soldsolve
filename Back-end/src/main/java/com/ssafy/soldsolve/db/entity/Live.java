package com.ssafy.soldsolve.db.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Timestamp;

import static javax.persistence.FetchType.LAZY;

@Entity
@Data
public class Live {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "live_id")
    public int id;

    @Column(length = 50)
    private String title;

    private String content;

    @Column(columnDefinition = "bit default 0")
    private Boolean status;

    private Timestamp startTime;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_pk")
    private User user;

}
