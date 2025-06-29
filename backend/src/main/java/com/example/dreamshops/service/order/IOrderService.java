package com.example.dreamshops.service.order;
import com.example.dreamshops.dto.OrderDto;
import com.example.dreamshops.model.Order;

import java.util.List;

public interface IOrderService {
    Order placeOrder();
    OrderDto getOrderById(Long orderId);
    List<OrderDto> getUserOrders();

    OrderDto convertToDto(Order order);
}
