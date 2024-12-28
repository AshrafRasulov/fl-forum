package com.DL.junior.controller.auth;

import com.DL.junior.service.auth.SAuth;
import com.DL.junior.service.util.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/auth")
@RequiredArgsConstructor
public class CAuth {

  private final SAuth sAuth;

  @PostMapping()
  public ResponseEntity<String> auth(@RequestBody String data) {
    return sAuth.authorization(JsonParser.toJsonObject(data));
  }
}
