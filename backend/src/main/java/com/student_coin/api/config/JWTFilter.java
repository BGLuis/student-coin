package com.student_coin.api.config;

import com.student_coin.api.service.JWTService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import com.student_coin.api.exception.MissingAuthorizationHeaderException;

import io.jsonwebtoken.MalformedJwtException;

@Component
@AllArgsConstructor
public class JWTFilter extends OncePerRequestFilter {
    private JWTService jwtService;
    private UserDetailsService userDetailsService;

    private String extractJWTToken(HttpServletRequest request) throws MissingAuthorizationHeaderException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new MissingAuthorizationHeaderException("Missing or invalid Authorization header");
        }
        return authHeader.substring(7);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        if (securityContext.getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String jwtToken = extractJWTToken(request);
            String name = jwtService.extractUsername(jwtToken);
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(name);

            if (jwtService.validateToken(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
                        null,
                        userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                securityContext.setAuthentication(authToken);
            }

            filterChain.doFilter(request, response);
        }  catch (MalformedJwtException | MissingAuthorizationHeaderException ex) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}
