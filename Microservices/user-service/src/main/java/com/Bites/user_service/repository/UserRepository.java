package com.Bites.user_service.repository;


import com.Bites.user_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
	
	public User findByEmail(String email);
	Optional<User> findByCartId(String cartId);

}
