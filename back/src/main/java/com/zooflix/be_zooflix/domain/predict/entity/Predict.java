package com.zooflix.be_zooflix.domain.predict.entity;

import com.zooflix.be_zooflix.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Predict {

    @Id
    @GeneratedValue
    @Column(name = "pd_name")
    private int pdName;

    @Column(name = "stock_name", nullable = false)
    private String stockName;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_no")
    private User user;

    @Column(name = "create_date", nullable = false)
    private Date createDate;

    @Column(name = "pd_date", nullable = false)
    private Date pdDate;

    @Column(name = "pd_value", nullable = false)
    private int pdValue;

    @Column(name = "pd_content")
    private String pdContent;

    @Column(name = "pd_result")
    private String pdResult;

    @Column(name = "pre_value")
    private int preValue;

    @Column(name = "nxt_value")
    private int nxtValue;

    @Column(name = "pd_updown")
    private boolean pdUpDown;
}
