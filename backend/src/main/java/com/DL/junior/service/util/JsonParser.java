package com.DL.junior.service.util;

import com.google.gson.*;

public class JsonParser {

  public static JsonObject toJsonObject(String data) {
    return com.google.gson.JsonParser.parseString(data).getAsJsonObject();
  }

  public static JsonArray toJsonArray(String data) {
    return com.google.gson.JsonParser.parseString(data).getAsJsonArray();
  }

  public static JsonElement gson(String json) {
    try {
      return new Gson().fromJson(json, JsonObject.class);
    } catch (JsonSyntaxException e) {
      return new Gson().fromJson(json, JsonArray.class);
    }
  }
}
