package com.example.dreamshops.service.product;

import com.example.dreamshops.dto.ImageDto;
import com.example.dreamshops.dto.ProductDto;
import com.example.dreamshops.exceptions.AlreadyExistsException;
import com.example.dreamshops.exceptions.ProductNotFoundException;
import com.example.dreamshops.kafka.event.ProductEvent;
import com.example.dreamshops.kafka.producer.ProductProducer;
import com.example.dreamshops.model.Category;
import com.example.dreamshops.model.Image;
import com.example.dreamshops.model.Product;
import com.example.dreamshops.repository.CategoryRepository;
import com.example.dreamshops.repository.ImageRepository;
import com.example.dreamshops.repository.ProductRepository;
import com.example.dreamshops.request.AddProductRequest;
import com.example.dreamshops.request.ProductUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ImageRepository imageRepository;
    private final ModelMapper modelMapper;
    private final ProductProducer productProducer;

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + id));
    }

    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "products:list", allEntries = true),
            @CacheEvict(cacheNames = "products:count", allEntries = true)
    })
    public Product addProduct(AddProductRequest request) {
        if (productExists(request.getName(), request.getBrand())) {
            throw new AlreadyExistsException(request.getName());
        }
        Category category = Optional.ofNullable(categoryRepository.findByName(request.getCategory().getName()))
                .orElseGet(() -> {
                    Category newCategory = new Category(request.getCategory().getName());
                    return categoryRepository.save(newCategory);
                });
        Product savedProduct = productRepository.save(createProduct(request, category));
        publishProductEvent(savedProduct, "ADDED");
        return savedProduct;
    }

    public boolean productExists(String name, String brand) {
        return productRepository.existsByNameAndBrand(name, brand);
    }

    private Product createProduct(AddProductRequest request, Category category) {
        return new Product(
                request.getName(),
                request.getBrand(),
                request.getPrice(),
                request.getInventory(),
                request.getDescription(),
                category
        );
    }

    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "products:byId", key = "#productId"),
            @CacheEvict(cacheNames = "products:list", allEntries = true),
            @CacheEvict(cacheNames = "products:count", allEntries = true)
    })
    public Product updateProduct(ProductUpdateRequest request, Long productId) {
        Product updatedProduct = productRepository.findById(productId)
                .map(existingProduct -> updateExistingProduct(existingProduct, request))
                .map(productRepository::save)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + productId));


        publishProductEvent(updatedProduct, "UPDATED");
        return updatedProduct;
    }

    private Product updateExistingProduct(Product existingProduct, ProductUpdateRequest request) {
        existingProduct.setName(request.getName());
        existingProduct.setBrand(request.getBrand());
        existingProduct.setPrice(request.getPrice());
        existingProduct.setInventory(request.getInventory());
        existingProduct.setDescription(request.getDescription());

        Category category = categoryRepository.findByName(request.getCategory().getName());
        existingProduct.setCategory(category);
        return existingProduct;
    }

    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "products:byId", key = "#id"),
            @CacheEvict(cacheNames = "products:list", allEntries = true),
            @CacheEvict(cacheNames = "products:count", allEntries = true)
    })
    public void deleteProductById(Long id) {
        productRepository.findById(id).ifPresentOrElse(product -> {
            publishProductEvent(product, "DELETED");
            productRepository.delete(product);
        }, () -> {
            throw new ProductNotFoundException("Product not found with id: " + id);
        });
    }

    private void publishProductEvent(Product product, String eventType) {
        ProductEvent event = new ProductEvent(
                product.getId(),
                product.getName(),
                product.getBrand(),
                eventType
        );
        productProducer.sendProductEvent(event);
    }

    @Override
    @Cacheable(cacheNames = "products:list", key = "'all'")
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return getConvertedProducts(products);
    }

    @Override
    public List<Product> getProductsByName(String name) {
        return productRepository.findByName(name);
    }

    @Override
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryName(category);
    }

    @Override
    public List<Product> getProductsByBrand(String brand) {
        return productRepository.findByBrand(brand);
    }

    @Override
    public List<Product> getProductsByCategoryAndBrand(String category, String brand) {
        return productRepository.findByCategoryNameAndBrand(category, brand);
    }

    @Override
    public List<Product> getProductsByBrandAndName(String brand, String name) {
        return productRepository.findByBrandAndName(brand, name);
    }

    @Override
    @Cacheable(cacheNames = "products:count", key = "'countByBrandAndName:' + #brand + ':' + #name")
    public Long countProductsByBrandAndName(String brand, String name) {
        return productRepository.countByBrandAndName(brand, name);
    }

    @Override
    public List<ProductDto> getConvertedProducts(List<Product> products) {
        return products.stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    public ProductDto convertToDto(Product product) {
        ProductDto productDto = modelMapper.map(product, ProductDto.class);
        List<Image> images = imageRepository.findByProductId(product.getId());
        List<ImageDto> imageDtos = images.stream()
                .map(image -> modelMapper.map(image, ImageDto.class))
                .toList();
        productDto.setImages(imageDtos);
        return productDto;
    }
}

