package com.Bites.user_service.controller;

import com.Bites.user_service.config.JwtProvider;
import com.Bites.user_service.entity.User;
import com.Bites.user_service.exception.UserException;
import com.Bites.user_service.repository.UserRepository;
import com.Bites.user_service.response.AuthResponse;
import com.Bites.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class Admincontroller {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createAdminUser(
            @RequestBody User user) throws UserException {

        String email = user.getEmail();
        String password = user.getPassword();
        String fullName = user.getFullName();
        String mobile=user.getMobile();


        User isEmailExist = userRepository.findByEmail(email);

        if (isEmailExist!=null) {

            throw new UserException("Email Is Already Used With Another Account");
        }

        // Create new user
        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setFullName(fullName);
        createdUser.setMobile(mobile);
        createdUser.setRole("ADMIN");
        createdUser.setPassword(passwordEncoder.encode(password));

        User savedUser = userRepository.save(createdUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = JwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Register Success");

        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);

    }
}
