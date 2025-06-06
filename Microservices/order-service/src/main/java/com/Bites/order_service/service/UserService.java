package com.Bites.order_service.service;
import com.Bites.order_service.dtos.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "user-service",url = "http://localhost:5001")
public interface UserService {
    @GetMapping("/api/users/profile")
    public UserDto getUserProfileHandler(
            @RequestHeader("Authorization") String jwt);
}
