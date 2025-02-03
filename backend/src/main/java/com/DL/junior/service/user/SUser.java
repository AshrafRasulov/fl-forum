package com.DL.junior.service.user;

import com.DL.junior.model.User;
import com.DL.junior.service.core.DLSql;
import com.DL.junior.service.util.Util;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class SUser {

  private final DLSql sql;
  public Optional<User> findByLogin(JsonObject data) {
    Optional<User> optionalUser;
    try {
      List<String> roles = new ArrayList<>();
      JsonObject js = sql.callFunction("Core_User.Auth", data);
      User user = new User();

      user.setUserId(js.get("user_id").getAsLong());
      user.setLogin(js.get("login").getAsString());
      user.setPassword(js.get("password").getAsString());
      user.setFirstName(js.get("first_name").getAsString());
      user.setRoles(roles);
      user.setLastName(js.get("last_name").getAsString());
      user.setMiddleName(js.get("middle_name").getAsString());
      user.setState(js.get("state").getAsString());
      user.setIsAdmin(js.get("is_admin").getAsShort());
      js.get("roles").getAsJsonArray().forEach(f -> roles.add(f.toString()));
      optionalUser = Optional.of(user);
    } catch (Exception e) {
      optionalUser = Optional.empty();
    }
    return optionalUser;
  }

  public ResponseEntity<String> getUserById(JsonObject data) {
    JsonObject res = new JsonObject();
    try {
      res = sql.callFunction("Core_User.Get_User_By_Id", data);
      Util.successMsg(res);
    } catch (Exception e) {
      Util.errorMsg(res, e.getMessage());
    }
    return ResponseEntity.ok(res.toString());
  }

  public ResponseEntity<String> getAllUsers(JsonObject data) {
    JsonObject res = new JsonObject();
    try {
      res = sql.callFunction("Core_User.Get_Users", data);
      Util.successMsg(res);
    } catch (Exception e) {
      Util.errorMsg(res, e.getMessage());
    }
    return ResponseEntity.ok(res.toString());
  }

  public ResponseEntity<String> save(JsonObject data) {
    var res = new JsonObject();
    try {
      sql.callProcedure("Core_User.Save_User", data);
      Util.successMsg(res);
    } catch (Exception e) {
      Util.errorMsg(res, e.getMessage());
    }
    return ResponseEntity.ok(res.toString());
  }


  public ResponseEntity<String> setUserStatus(HttpServletRequest req, JsonObject data) {
    var res = new JsonObject();
    try {
      var jwt_user_id = Util.getUserId(req);
      data.addProperty("user_id", jwt_user_id);
      sql.callProcedure("Core_User.Set_User_State", data);
      Util.successMsg(res);
    } catch (Exception e) {
      Util.errorMsg(res, e.getMessage());
    }
    return ResponseEntity.ok(res.toString());
  }

  public ResponseEntity<String> deleteUserById(HttpServletRequest req, JsonObject data) {
    var res = new JsonObject();
    try {
      var jwt_user_id = Util.getUserId(req);
      data.addProperty("session_user_id", jwt_user_id);
      sql.callProcedure("Core_User.Delete_User", data);
      System.out.println(data);
      Util.successMsg(res);
    } catch (Exception e) {
      Util.errorMsg(res, e.getMessage());
    }
    return ResponseEntity.ok(res.toString());
  }
}
