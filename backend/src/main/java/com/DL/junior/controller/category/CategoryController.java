package com.DL.junior.controller.category;

import com.DL.junior.service.category.CategoryService;
import com.DL.junior.service.util.JsonParser;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/category/")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService service;

    @PostMapping(value = "all")
    public ResponseEntity<String> getCategories(HttpServletRequest req, @RequestBody String data){
        return service.getCategories(JsonParser.toJsonObject(data));
    }

}
