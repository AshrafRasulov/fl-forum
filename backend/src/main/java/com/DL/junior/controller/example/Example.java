package com.DL.junior.controller.example;

import com.DL.junior.service.example.SExample;
import com.DL.junior.service.util.JsonParser;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/example/")
@RequiredArgsConstructor
public class Example {

  private final SExample sExample;

  @PostMapping(value = "save")
  public ResponseEntity<String> save(HttpServletRequest req, @RequestBody String data) {
    return sExample.save(req, JsonParser.toJsonObject(data));
  }

  @PostMapping(value = "info")
  public ResponseEntity<String> info( @RequestBody String data) {
    return sExample.info(JsonParser.toJsonObject(data));
  }

  @PostMapping(value = "delete")
  public ResponseEntity<String> delete( @RequestBody String data) {
    return sExample.delete(JsonParser.toJsonObject(data));
  }

}
