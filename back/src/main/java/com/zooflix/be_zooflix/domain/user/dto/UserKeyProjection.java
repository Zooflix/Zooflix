package com.zooflix.be_zooflix.domain.user.dto;

import java.time.LocalDateTime;

public interface UserKeyProjection {
    String getUserAppKey();

    String getUserSecretKey();

    String getUserAccount();

    String getUserToken();
    LocalDateTime getUserTokenDate();
}
