package com.zooflix.be_zooflix.global.jwt;

import com.zooflix.be_zooflix.global.jwt.repository.JWTRefreshRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class CustomLogoutFilter extends GenericFilterBean {

    private final JWTUtil jwtUtil;
    private final JWTRefreshRepository jwtRefreshRepository;

    public CustomLogoutFilter(JWTUtil jwtUtil, JWTRefreshRepository jwtRefreshRepository) {

        this.jwtUtil = jwtUtil;
        this.jwtRefreshRepository = jwtRefreshRepository;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {

        //path and method verify
        String requestUri = request.getRequestURI(); // uri 에서 패스 값 꺼내기.
        if (!requestUri.matches("^\\/logout$")) { // 로그 아웃 확인

            filterChain.doFilter(request, response); // 아니면 다음 필터로 넘어가게 함.
            return;
        }
        String requestMethod = request.getMethod();
        if (!requestMethod.equals("POST")) { // 로그아웃 이여도 POST 요청이 아니면 넘어감

            filterChain.doFilter(request, response);
            return;
        }

        //get refresh token
        String refresh = null;
        Cookie[] cookies = request.getCookies(); // 쿠키 다 부르고
        for (Cookie cookie : cookies) { // 여기서 리프레쉬 쿠키만 찾음.

            if (cookie.getName().equals("refresh")) {

                refresh = cookie.getValue();
            }
        }

        //refresh null check 쿠키에 리프레쉬토큰이 없으면 에러
        if (refresh == null) {

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        //expired check 만료 된건지 확인.
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {

            //response status code 이미 만료 됐으면 보내는 리퀘스트. 굳이 bad 말고 다른거도 ㄱㅊ
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(refresh);
        if (!category.equals("refresh")) {

            //response status code 리프레쉬 토큰이 아니면 bad
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        //DB에 저장되어 있는지 확인
        Boolean isExist = jwtRefreshRepository.existsByRefreshToken(refresh);
        if (!isExist) {

            //response status code 없다는건 이미 로그아웃 된 상태니까 그에 맞게 리퀘스트. bad 아니여도 댐!
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        //로그아웃 진행
        //Refresh 토큰 DB에서 제거
        jwtRefreshRepository.deleteByRefreshToken(refresh);

        //Refresh 토큰 Cookie 값 0
        Cookie cookie = new Cookie("refresh", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        response.addCookie(cookie);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}