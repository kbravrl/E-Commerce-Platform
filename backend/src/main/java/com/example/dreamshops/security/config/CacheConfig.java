package com.example.dreamshops.security.config;

import java.time.Duration;
import java.util.HashMap;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.CacheErrorHandler;
import org.springframework.cache.interceptor.SimpleCacheErrorHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory cf) {
        // ISOLATION: ObjectMapper for Redis
        ObjectMapper om = new ObjectMapper();
        om.registerModule(new JavaTimeModule());

        var serializer = new GenericJackson2JsonRedisSerializer(om);

        RedisCacheConfiguration base = RedisCacheConfiguration
                .defaultCacheConfig()
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(serializer))
                .entryTtl(Duration.ofMinutes(10))
                .disableCachingNullValues();

        var configs = new HashMap<String, RedisCacheConfiguration>();
        configs.put("products:byId", base.entryTtl(Duration.ofMinutes(30)));
        configs.put("products:list", base.entryTtl(Duration.ofMinutes(5)));
        configs.put("products:count", base.entryTtl(Duration.ofMinutes(5)));

        return RedisCacheManager.builder(cf)
                .cacheDefaults(base)
                .withInitialCacheConfigurations(configs)
                .build();
    }

    // When Redis crashes, it should not be 500 (requests should still run from the DB)
    @Bean
    public CacheErrorHandler cacheErrorHandler() {
        return new SimpleCacheErrorHandler();
    }
}