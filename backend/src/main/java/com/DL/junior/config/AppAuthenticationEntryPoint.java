package com.DL.junior.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.IOException;

@ControllerAdvice
public class AppAuthenticationEntryPoint implements AuthenticationEntryPoint {
  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException auth) throws IOException, ServletException {
    // 401
    setResponseError(response, HttpServletResponse.SC_UNAUTHORIZED, "Authentication Failed");
  }
  @ExceptionHandler(value = {AccessDeniedException.class})
  public void commence(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
    // 403
    setResponseError(response, HttpServletResponse.SC_FORBIDDEN, String.format("Access Denies: %s", accessDeniedException.getMessage()));
  }
  @ExceptionHandler (value = {ClassNotFoundException.class})
  public void commence(HttpServletRequest request, HttpServletResponse response, ClassNotFoundException notFoundException) throws IOException {
    // 404
    setResponseError(response, HttpServletResponse.SC_NOT_FOUND, String.format("Not found: %s", notFoundException.getMessage()));
  }
  @ExceptionHandler (value = {Exception.class})
  public void commence(HttpServletRequest request, HttpServletResponse response, Exception exception) throws IOException {
    // 500
    setResponseError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, String.format("Internal Server Error: %s", exception.getMessage()));
    throw new RuntimeException(exception);
  }
  private void setResponseError(HttpServletResponse response, int errorCode, String errorMessage) throws IOException{
    response.setStatus(errorCode);
    response.getWriter().write(errorMessage);
    response.getWriter().flush();
    response.getWriter().close();
  }
}
