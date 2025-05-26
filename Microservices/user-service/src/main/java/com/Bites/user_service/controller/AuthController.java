package com.Bites.user_service.controller;



import com.Bites.user_service.config.JwtProvider;
import com.Bites.user_service.entity.User;
import com.Bites.user_service.exception.UserException;
import com.Bites.user_service.repository.UserRepository;
import com.Bites.user_service.request.LoginRequest;
import com.Bites.user_service.response.AuthResponse;
import com.Bites.user_service.service.CustomeUserServiceImplementation;
import com.Bites.user_service.service.UserService;
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

		String email = user.getEmail();
		String password = user.getPassword();
		String fullName = user.getFullName();
		String mobile=user.getMobile();


		User isEmailExist = userRepository.findByEmail(email);

		if (isEmailExist!=null) {

			throw new UserException("This email already exists with another account.");
		}

		// Create new user
		User createdUser = new User();
		createdUser.setEmail(email);
		createdUser.setFullName(fullName);
		createdUser.setMobile(mobile);
		createdUser.setRole("CUSTOMER");
		createdUser.setPassword(passwordEncoder.encode(password));

		createdUser.setCartId(generateUniqueCartId());

		User savedUser = userRepository.save(createdUser);

		Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = JwtProvider.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Signup Successful! Please log in.");

		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);

	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest) {

		String username = loginRequest.getEmail();
		String password = loginRequest.getPassword();

		System.out.println(username + " ----- " + password);

		Authentication authentication = authenticate(username, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = JwtProvider.generateToken(authentication);
		AuthResponse authResponse = new AuthResponse();

		authResponse.setMessage("Login Success");
		authResponse.setJwt(token);

		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);
	}

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = customUserDetails.loadUserByUsername(username);

		System.out.println("sign in userDetails - " + userDetails);

		if (userDetails == null) {
			System.out.println("sign in userDetails - null " + userDetails);
			throw new BadCredentialsException("Invalid username or password");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			System.out.println("sign in userDetails - password not match " + userDetails);
			throw new BadCredentialsException("Invalid username or password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

	private String generateUniqueCartId() {
		return "CART-" + UUID.randomUUID().toString();
	}
	
}
