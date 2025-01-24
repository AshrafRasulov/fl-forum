package com.DL.junior.controller.comment;

import com.DL.junior.service.comment.CommentService;
import com.DL.junior.service.util.JsonParser;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/message/")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("save")
    public ResponseEntity<String> save(HttpServletRequest req, @RequestBody String data) {
        return commentService.save(req, JsonParser.toJsonObject(data));
    }

}
