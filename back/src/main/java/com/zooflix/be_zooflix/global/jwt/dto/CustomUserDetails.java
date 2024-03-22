package com.zooflix.be_zooflix.global.jwt.dto;

import com.zooflix.be_zooflix.domain.user.dto.UserDto;
import com.zooflix.be_zooflix.domain.user.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private final UserDto userDto;

    public CustomUserDetails(UserDto userDto) {

        this.userDto = userDto;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {

            @Override
            public String getAuthority() {

                return userDto.getUserRole();
            }
        });

        return collection;
    }

    @Override
    public String getPassword() {

        return userDto.getUserPw();
    }

    @Override
    public String getUsername() { // 난 userId로 쓰는데 만들어져 있는 메서드들은 username 기준이라 이름만 이렇게 하고 실제 값은 id로 줘야 한다.

        return userDto.getUserId();
    }
    public int getUserNo() {
        return userDto.getUserNo();
    }
    @Override
    public boolean isAccountNonExpired() {

        return true;
    }

    @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }

    @Override
    public boolean isEnabled() {

        return true;
    }
}
