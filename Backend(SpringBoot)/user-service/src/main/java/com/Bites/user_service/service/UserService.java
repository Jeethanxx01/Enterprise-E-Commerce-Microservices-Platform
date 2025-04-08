package com.Bites.user_service.service;


import com.Bites.user_service.entity.User;
import com.Bites.user_service.exception.UserException;

import java.util.List;

public interface UserService {

	public User findUserProfileByJwt(String jwt) throws UserException;
	
	public User findUserByEmail(String email) throws UserException;
	
	public User findUserById(Long userId) throws UserException;

	public List<User> findAllUsers();

}
