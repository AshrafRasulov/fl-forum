package com.DL.junior.service.category;

import com.DL.junior.service.core.DLSql;
import com.DL.junior.service.util.Util;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryService {
    private final DLSql sql;

    public ResponseEntity<String> getCategories(JsonObject data){
        JsonObject res = new JsonObject();
        try{
            res = sql.callFunction("Forum_Category.Get_Categories", data);
            Util.successMsg(res);
        }
        catch (Exception e){
            Util.errorMsg(res, e.getMessage());
        }
        return ResponseEntity.ok(res.toString());
    }


}
