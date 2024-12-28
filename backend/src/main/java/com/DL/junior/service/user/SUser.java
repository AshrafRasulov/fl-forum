package com.DL.junior.service.user;

import com.DL.junior.model.User;
import com.DL.junior.service.core.DLSql;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class SUser {

  private final DLSql sql;

  public Optional<User> findByLogin(JsonObject data) {
    Optional<User> optionalUser;
    try {
      List<String> roles = new ArrayList<>();
      JsonObject js = sql.callFunction("Core_User.Auth",data);
      User user = new User();

      user.setUserId(js.get("user_id").getAsLong());
      user.setLogin(js.get("login").getAsString());
      user.setPassword(js.get("password").getAsString());
      user.setFirstName(js.get("first_name").getAsString());
      user.setRoles(roles);
      user.setLastName(js.get("last_name").getAsString());
      user.setMiddleName(js.get("middle_name").getAsString());
      user.setState(js.get("state").getAsString());

      js.get("roles").getAsJsonArray().forEach(f -> roles.add(f.toString()));
      optionalUser = Optional.of(user);
    } catch (Exception e) {
      optionalUser = Optional.empty();
    }
    return optionalUser;
  }



}
