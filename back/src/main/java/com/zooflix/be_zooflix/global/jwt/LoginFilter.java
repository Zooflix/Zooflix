package com.zooflix.be_zooflix.global.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zooflix.be_zooflix.domain.user.dto.UserDto;
import com.zooflix.be_zooflix.domain.user.dto.UserLoginDto;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.global.jwt.dto.CustomUserDetails;
import com.zooflix.be_zooflix.global.jwt.entity.JWTRefresh;
import com.zooflix.be_zooflix.global.jwt.repository.JWTRefreshRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    private final JWTRefreshRepository jwtRefreshRepository;

    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, JWTRefreshRepository jwtRefreshRepository) {

        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.jwtRefreshRepository = jwtRefreshRepository;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String contentType = request.getContentType();
        String userId = "";
        String userPw = "";
        if (contentType.equals("application/json")) {
            ObjectMapper om = new ObjectMapper();
            try {
                User user = om.readValue(request.getInputStream(), User.class);
                if (user != null) {
                    userId = user.getUserId();
                    userPw = user.getUserPw();
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        else {
            //클라이언트 요청에서 username, password 추출
            userId = obtainUsername(request);
            userPw = obtainPassword(request);
        }


        //스프링 시큐리티에서 username과 password를 검증하기 위해서는 token에 담아야 함
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userId, userPw, null);

        //token에 담은 검증을 위한 AuthenticationManager로 전달
        return authenticationManager.authenticate(authToken);
    }

    //로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
        //유저 정보. getName 으로 username 꺼내옴.
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        int userNo = customUserDetails.getUserNo();
        String userId = authentication.getName();

        // 반복자 사용해서 authentication 에서 role 값 가져오기 가능.
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        //토큰 생성
        String access = jwtUtil.createJwt("access", userNo, userId, role, 60000011L);
        String refresh = jwtUtil.createJwt("refresh", userNo, userId, role, 86400000L);

        //Refresh 토큰 저장
        addRefreshEntity(userId, refresh, 86400000L);

        //응답 설정
        response.setHeader("access", access); // 응답 헤더에 access 넣어줌.
        Cookie cookie = new Cookie("refresh", refresh);
        cookie.setPath("/");
        response.addCookie(cookie); // 응답 쿠키에 refresh 넣어줌
        response.setStatus(HttpStatus.OK.value()); // 응답 선택 코드. 200

    }

    private void addRefreshEntity(String userId, String refresh, Long expiredMs) {

        Date date = new Date(System.currentTimeMillis() + expiredMs);

        JWTRefresh jwtRefresh = new JWTRefresh();
        jwtRefresh.setUserId(userId);
        jwtRefresh.setRefreshToken(refresh);
        jwtRefresh.setExpiration(date.toString());

        jwtRefreshRepository.save(jwtRefresh);
    }

    //로그인 실패시 실행하는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        response.setStatus(401);
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value); // 키랑 value로 쿠키 생성.
        cookie.setMaxAge(24*60*60);
        cookie.setSecure(true); // https 통신 진행할 경우 추가
        //cookie.setPath("/"); // 쿠키 적용 범위도 설정 가능
        cookie.setHttpOnly(true); // 이걸로 자바 스크립트로 쿠키 접근 못하게 막기.

        return cookie;
    }
}
