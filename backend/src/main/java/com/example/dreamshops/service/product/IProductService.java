package com.example.dreamshops.service.product;

import com.example.dreamshops.dto.ProductDto;
import com.example.dreamshops.model.Product;
import com.example.dreamshops.request.AddProductRequest;
import com.example.dreamshops.request.ProductUpdateRequest;

import java.util.List;

public interface IProductService {
    Product getProductById(Long id);
    Product addProduct(AddProductRequest product);
    Product updateProduct(ProductUpdateRequest request, Long productId);
    void deleteProductById(Long id);
    List<ProductDto> getAllProducts();
    List<Product> getProductsByName(String name);
    List<Product> getProductsByCategory(String category);
    List<Product> getProductsByBrand(String brand);
    List<Product> getProductsByCategoryAndBrand(String category, String brand);
    List<Product> getProductsByBrandAndName(String brand, String name);

    Long countProductsByBrandAndName(String brand, String name);


    List<ProductDto> getConvertedProducts(List<Product> products);

    ProductDto convertToDto(Product product);
}
