package com.DL.junior.service.post;

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
public class PostService {
    private final DLSql sql;

    public ResponseEntity<String> save(HttpServletRequest req, JsonObject data){
        var res = new JsonObject();
        try{
            var jwt_user_id = Util.getUserId(req);
            data.addProperty("user_id", jwt_user_id);
            sql.callProcedure("Forum_Post.Save_Post", data);
            Util.successMsg(res);
        }
        catch (Exception e){
            Util.errorMsg(res, e.getMessage());
        }
        return ResponseEntity.ok(res.toString());
    }

    public ResponseEntity<String> getPosts(JsonObject data){
        JsonObject res = new JsonObject();
        try{
            res = sql.callFunction("Forum_Post.Get_Posts", data);
            Util.successMsg(res);
        }
        catch (Exception e){
            Util.errorMsg(res, e.getMessage());
        }
        return ResponseEntity.ok(res.toString());
    }

    public ResponseEntity<String> delete(HttpServletRequest req, JsonObject data){
        JsonObject res = new JsonObject();
        try {
            var jwt_user_id = Util.getUserId(req);
            data.addProperty("user_id", jwt_user_id);
            sql.callProcedure("Forum_Post.Delete_Post", data);
            Util.successMsg(res);
        }
        catch(Exception e){
            Util.errorMsg(res, e.getMessage());
        }

        return  ResponseEntity.ok(res.toString());
    }

    public ResponseEntity<String> getPost(JsonObject data) {
        JsonObject res = new JsonObject();
        try{
            res = sql.callFunction("Forum_Post.Get_Post", data);
            Util.successMsg(res);
        }
        catch (Exception e){
            Util.errorMsg(res, e.getMessage());
        }
        return ResponseEntity.ok(res.toString());
    }
}
