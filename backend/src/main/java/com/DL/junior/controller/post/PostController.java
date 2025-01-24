package com.DL.junior.controller.post;

import com.DL.junior.service.post.PostService;
import com.DL.junior.service.util.JsonParser;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/post/")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping(value = "save")
    public ResponseEntity<String> save(HttpServletRequest req, @RequestBody String data){
        return postService.save(req, JsonParser.toJsonObject(data));
    }

    @PostMapping("get_posts")
    public ResponseEntity<String> getPosts(@RequestBody String data){
        return postService.getPosts(JsonParser.toJsonObject(data));
    }

    @PostMapping("get_post")
    public ResponseEntity<String> getPost(@RequestBody String data){
        return postService.getPost(JsonParser.toJsonObject(data));
    }

    @PostMapping(value = "delete")
    public ResponseEntity<String> delete(HttpServletRequest req, @RequestBody String data){
        return postService.delete(req, JsonParser.toJsonObject(data));
    }

    @PostMapping(value = "set_post_status")
    public ResponseEntity<String> setPostStatus(HttpServletRequest req, @RequestBody String data){
        return postService.setPostStatus(req, JsonParser.toJsonObject(data));
    }

}
