package com.zooflix.be_zooflix.global.jwt;

import com.zooflix.be_zooflix.global.jwt.dto.CustomUserDetails;
import com.zooflix.be_zooflix.domain.user.dto.UserDto;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;

public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {

        this.jwtUtil = jwtUtil;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // request의 헤더에서 access키에 담긴 토큰을 꺼냄
        String accessToken = request.getHeader("access");
        // 토큰이 없다면 다음 필터로 넘김
        if (accessToken == null) {
            filterChain.doFilter(request, response);

            return;
        }

        // 토큰 만료 여부 확인, 만료시 다음 필터로 넘기지 않음
        try {
            jwtUtil.isExpired(accessToken);
        } catch (ExpiredJwtException e) {
            //response body
            PrintWriter writer = response.getWriter();
            writer.print("access token expired");

            //response status code 특정한 상태 코드 보냄. 만료된건 필터로 넘기지 않는다.
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // 토큰이 access인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(accessToken);

        if (!category.equals("access")) {
            //response body
            PrintWriter writer = response.getWriter();
            writer.print("invalid access token");

            //response status code 여기도 응답하고 필터로 넘기는 거 아님. 프론트와 협의해서 정하는 부분.
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // username, role 값을 획득
        String userId = jwtUtil.getUserId(accessToken);
        String role = jwtUtil.getRole(accessToken);
        String userName = jwtUtil.getUserName(accessToken);
        int userNo = jwtUtil.getUserNo(accessToken);
        String userZbti = jwtUtil.getUserZbti(accessToken);

        UserDto userDto = new UserDto();
        userDto.setUserId(userId);
        userDto.setUserRole(role);
        userDto.setUserNo(userNo);
        userDto.setUserName(userName);
        userDto.setUserZbti(userZbti);
        CustomUserDetails customUserDetails = new CustomUserDetails(userDto);
        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);

    }
}
