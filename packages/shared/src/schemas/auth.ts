import { z } from 'zod';

// Login schema with detailed error messages
export const loginSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }).email("Invalid email format"),
  
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }).min(6, "Password must be at least 6 characters long"),
}).strict(); // Will error on unknown fields

// Registration schema with detailed error messages
export const registerSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }).email("Invalid email format"),
  
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }).min(6, "Password must be at least 6 characters long"),
  
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }).min(1, "Name cannot be empty"),
  
  surname: z.string({
    required_error: "Surname is required",
    invalid_type_error: "Surname must be a string",
  }).min(1, "Surname cannot be empty"),
}).strict(); // Will error on unknown fields
