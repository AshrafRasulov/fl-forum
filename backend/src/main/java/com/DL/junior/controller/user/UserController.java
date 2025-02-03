package com.DL.junior.controller.user;

import com.DL.junior.service.user.SUser;
import com.DL.junior.service.util.JsonParser;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user/")
@RequiredArgsConstructor
public class UserController {
    private final SUser userService;

    @PostMapping("get_all")
    public ResponseEntity<String> getAll(@RequestBody String data){
        return userService.getAllUsers(JsonParser.toJsonObject(data));
    }

    @PostMapping("get_user_by_id")
    public ResponseEntity<String> getUserById(@RequestBody String data){
        return userService.getUserById(JsonParser.toJsonObject(data));
    }

    @PostMapping("save")
    public ResponseEntity<String> save(@RequestBody String data){
        return userService.save(JsonParser.toJsonObject(data));
    }

    @PostMapping("set_user_status")
    public ResponseEntity<String> setUserStatus(HttpServletRequest req, @RequestBody String data){
        return userService.setUserStatus(req, JsonParser.toJsonObject(data));
    }

    @PostMapping("delete_user_by_id")
    public ResponseEntity<String> deleteUserById(HttpServletRequest req, @RequestBody String data){
        return userService.deleteUserById(req, JsonParser.toJsonObject(data));
    }

}
