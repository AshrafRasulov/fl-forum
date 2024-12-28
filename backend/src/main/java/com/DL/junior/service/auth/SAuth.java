package com.DL.junior.service.auth;

import com.DL.junior.model.User;
import com.DL.junior.service.jwt.JwtService;
import com.DL.junior.service.user.SUser;
import com.DL.junior.service.util.Util;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class SAuth {

  private final SUser sUser;
  private final JwtService sJwt;
  private final AuthenticationManager authManager;

  public ResponseEntity<String> authorization(JsonObject data) {
    JsonObject res = new JsonObject();
    try {
      authenticate(data.get("login").getAsString(),data.get("password").getAsString());
      Optional<User> optionalUser = sUser.findByLogin(data);
      optionalUser.ifPresentOrElse(
        user -> {
          JsonObject obj = new JsonObject();
          JsonArray roles = new JsonArray();
          user.getRoles().forEach(roles::add);
          obj.addProperty("first_name", user.getFirstName());
          obj.addProperty("last_name", user.getLastName());
          obj.addProperty("middle_name", user.getMiddleName());
          obj.addProperty("user_id", user.getUserId());
          obj.add("roles", roles);
          generateToken(res, user);
          res.add("user",obj);
        }, () -> Util.errorMsg(res,"auth_error")
      );
      return ResponseEntity.status(HttpStatus.OK).body(res.toString());
    } catch (Exception e) {
      Util.errorMsg(res,"auth_error");
      return ResponseEntity.status(HttpStatus.OK).body(res.toString());
    }

  }

  public void authenticate(String login, String password) throws Exception {
    try {
      authManager.authenticate(new UsernamePasswordAuthenticationToken(login,password));
    } catch (Exception e) {
      throw new Exception(e);
    }
  }

  private void generateToken(JsonObject res, User user) {
    res.addProperty("token", sJwt.generateToken(user));
    Util.successMsg(res);
  }

}
