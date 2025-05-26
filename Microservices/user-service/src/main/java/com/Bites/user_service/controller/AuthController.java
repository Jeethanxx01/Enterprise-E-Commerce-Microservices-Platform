package com.Bites.user_service.controller;

import com.Bites.user_service.config.JwtProvider;
import com.Bites.user_service.entity.User;
import com.Bites.user_service.exception.UserException;
import com.Bites.user_service.repository.UserRepository;
import com.Bites.user_service.request.LoginRequest;
import com.Bites.user_service.response.AuthResponse;
import com.Bites.user_service.service.CustomeUserServiceImplementation;
import com.Bites.user_service.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private CustomeUserServiceImplementation customUserDetails;
	
	@Autowired
    private UserService userService;

	

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(
			@RequestBody User user) throws UserException {

		logger.info("Received signup request for email: {}", user.getEmail());
		String email = user.getEmail();
		String password = user.getPassword();
		String fullName = user.getFullName();
		String mobile=user.getMobile();

		User isEmailExist = userRepository.findByEmail(email);

		if (isEmailExist!=null) {
			logger.warn("Signup failed - Email already exists: {}", email);
			throw new UserException("This email already exists with another account.");
		}

		// Create new user
		User createdUser = new User();
		createdUser.setEmail(email);
		createdUser.setFullName(fullName);
		createdUser.setMobile(mobile);
		createdUser.setRole("CUSTOMER");
		createdUser.setPassword(passwordEncoder.encode(password));

		String cartId = generateUniqueCartId();
		logger.debug("Generated new cart ID: {} for user: {}", cartId, email);
		createdUser.setCartId(cartId);

		User savedUser = userRepository.save(createdUser);
		logger.info("Successfully created new user with ID: {}", savedUser.getId());

		Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = JwtProvider.generateToken(authentication);
		logger.debug("Generated JWT token for user: {}", email);

		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Signup Successful! Please log in.");

		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);
	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest) {
		String username = loginRequest.getEmail();
		logger.info("Received signin request for user: {}", username);

		String password = loginRequest.getPassword();

		try {
			Authentication authentication = authenticate(username, password);
			SecurityContextHolder.getContext().setAuthentication(authentication);

			String token = JwtProvider.generateToken(authentication);
			logger.info("User successfully authenticated: {}", username);

			AuthResponse authResponse = new AuthResponse();
			authResponse.setMessage("Login Success");
			authResponse.setJwt(token);

			return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);
		} catch (BadCredentialsException e) {
			logger.warn("Authentication failed for user: {}", username);
			throw e;
		}
	}

	private Authentication authenticate(String username, String password) {
		logger.debug("Attempting to authenticate user: {}", username);
		UserDetails userDetails = customUserDetails.loadUserByUsername(username);

		if (userDetails == null) {
			logger.warn("Authentication failed - User not found: {}", username);
			throw new BadCredentialsException("Invalid username or password");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			logger.warn("Authentication failed - Invalid password for user: {}", username);
			throw new BadCredentialsException("Invalid username or password");
		}
		logger.debug("User successfully authenticated: {}", username);
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

	private String generateUniqueCartId() {
		String cartId = "CART-" + UUID.randomUUID().toString();
		logger.debug("Generated new cart ID: {}", cartId);
		return cartId;
	}
	
}
