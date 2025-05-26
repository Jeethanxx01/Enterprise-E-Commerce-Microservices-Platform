package com.Bites.user_service.exception;

import java.time.LocalDateTime;

public class ErrorDetais {

	private String error;
	private String message;
	private LocalDateTime timestamp;

	// Constructor to initialize all fields
	public ErrorDetais(String error, String message, LocalDateTime timestamp) {
		this.error = error;
		this.message = message;
		this.timestamp = timestamp;
	}

	// No-argument constructor (for possible deserialization or default instantiation)
	public ErrorDetais() {}

	// Getter and Setter for 'error'
	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	// Getter and Setter for 'message'
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	// Getter and Setter for 'timestamp'
	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	// Override toString() for better representation
	@Override
	public String toString() {
		return "ErrorDetais{" +
				"error='" + error + '\'' +
				", message='" + message + '\'' +
				", timestamp=" + timestamp +
				'}';
	}
}
