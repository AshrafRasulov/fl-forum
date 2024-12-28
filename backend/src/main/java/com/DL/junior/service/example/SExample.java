package com.DL.junior.service.example;

import com.DL.junior.service.core.DLSql;
import com.DL.junior.service.util.Util;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class SExample {

  private final DLSql sql;

  public ResponseEntity<String> save(HttpServletRequest req, JsonObject data) {
    var res = new JsonObject();
    try {
     // Пользователь который сохраняет операцию, получаем из токена
      var jwt_user_id = Util.getUserId(req);
      data.addProperty("user_id", jwt_user_id);
      sql.callProcedure("Example.Example_Save", data);
      Util.successMsg(res);
    } catch (Exception e) {
      Util.errorMsg(res, e.getMessage());
    }
    return ResponseEntity.ok(res.toString());
  }

  public ResponseEntity<String> info(JsonObject data) {
    JsonObject res = new JsonObject();
    try {
      res = sql.callFunction("Example.Example_Info", data);
      Util.successMsg(res);
    } catch (Exception e) {
      Util.errorMsg(res, e.getMessage());
    }
    return ResponseEntity.ok(res.toString());
  }

  public ResponseEntity<String> delete(JsonObject data) {
    var res = new JsonObject();
    try {
      sql.callProcedure("Example.Example_Delete", data);
      Util.successMsg(res);
    } catch (Exception e) {
      Util.errorMsg(res, e.getMessage());
    }
    return ResponseEntity.ok(res.toString());
  }
}
