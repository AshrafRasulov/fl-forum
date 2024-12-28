package com.DL.junior.service.core;

import com.DL.junior.service.util.DB;
import com.DL.junior.service.util.JsonParser;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.zaxxer.hikari.HikariDataSource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import oracle.jdbc.OracleType;
import org.springframework.stereotype.Service;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;

@Service
@RequiredArgsConstructor
@Slf4j
public class DLSql {

  private final HikariDataSource hds;

  public JsonObject callFunction(String funcName, JsonObject data) throws Exception {
    Connection conn = null;
    CallableStatement sql = null;
    JsonObject js = new JsonObject();
    JsonElement element;
    try {
      conn = hds.getConnection();
      sql = conn.prepareCall("{ ? = CALL "+funcName+"(?) }");
      sql.registerOutParameter(1, Types.CLOB);
      sql.setObject(2, data.toString(), OracleType.JSON);
      sql.execute();
      element = JsonParser.gson(sql.getString(1));
      if (element.isJsonObject()) js = JsonParser.gson(sql.getString(1)).getAsJsonObject();
      else {
        var jsonArray = element.getAsJsonArray();
        js.add("obj",jsonArray);
      }
    } catch (Exception e) {
      log.error(e.getMessage());
        throw new Exception(e);
    } finally {
      DB.done(conn,sql);
    }
    return js;
  }

  public void callProcedure(String funcName, JsonObject data) throws Exception {
    Connection conn = null;
    CallableStatement sql = null;
    try {
      conn = hds.getConnection();
      sql = conn.prepareCall("{ CALL "+funcName+"(?) }");
      sql.setObject(1, data.toString(), OracleType.JSON);
      sql.execute();
    } catch (Exception e) {
      log.error(e.getMessage());
      throw new Exception(e);
    } finally {
      DB.done(conn,sql);
    }
  }

}
