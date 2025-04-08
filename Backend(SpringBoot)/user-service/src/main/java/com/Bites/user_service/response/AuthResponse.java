package com.Bites.user_service.response;

public class AuthResponse {

	private String jwt;
	private boolean status;
	private String message;

	// Default Constructor
	public AuthResponse() {
	}

	// Parameterized Constructor
	public AuthResponse(String jwt, boolean status, String message) {
		this.jwt = jwt;
		this.status = status;
		this.message = message;
	}

	// Getters
	public String getJwt() {
		return jwt;
	}

	public boolean isStatus() {
		return status;
	}

	public String getMessage() {
		return message;
	}

	// Setters
	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
