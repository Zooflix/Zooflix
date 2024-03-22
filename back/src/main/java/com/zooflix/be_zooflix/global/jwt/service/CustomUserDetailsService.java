package com.zooflix.be_zooflix.global.jwt.service;

import com.zooflix.be_zooflix.global.jwt.dto.CustomUserDetails;
import com.zooflix.be_zooflix.domain.user.dto.UserDto;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {

        User user = userRepository.findByUserId(userId);

        if (user != null) {
            //UserDetails에 담아서 return하면 AutneticationManager가 검증 함
            UserDto userDto = new UserDto();
            userDto = userDto.toDTO(user);
            return new CustomUserDetails(userDto);
        }

        return null;
    }
}
