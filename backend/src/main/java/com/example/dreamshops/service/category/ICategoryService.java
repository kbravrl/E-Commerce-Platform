package com.example.dreamshops.service.category;

import com.example.dreamshops.model.Category;

import java.util.List;

public interface ICategoryService {
    Category getCategoryById(Long id);
    Category getCategoryByName(String name);
    Category addCategory(Category category);
    List<Category> getAllCategories();
    Category updateCategory(Category category,Long id);
    void deleteCategory(Long id);
}
