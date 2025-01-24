package com.DL.junior.service.util;

import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.tomcat.util.codec.binary.Base64;

public class Util {

  public static void errorMsg(JsonObject response, String message) {
    response.addProperty("success", false);
    response.addProperty("msg", message);
  }

  public static void successMsg(JsonObject response, String message) {
    response.addProperty("success", true);
    response.addProperty("msg", message);
  }

  public static void successMsg(JsonObject response) {
    response.addProperty("success", true);
    response.addProperty("msg", "");
  }

  public static long getUserId(HttpServletRequest req) {
    try{
      final var token = req.getHeader("Authorization");
      if (token.isEmpty() || token.startsWith("Bearer ")) {
        String[] split_string = token.substring(7).split("\\.");
        String body = split_string[1];
        Base64 base64Url = new Base64(true);
        return JsonParser.toJsonObject(new String(base64Url.decode(body))).get("user_id").getAsLong();
      }
    } catch (Exception e) {
      return 0;
    }
    return 0;
  }

  //User Modal window

}
