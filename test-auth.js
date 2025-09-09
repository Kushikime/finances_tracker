// Simple test script to verify authentication endpoints
const fetch = require('node-fetch');

async function testAuth() {
  const baseUrl = 'http://localhost:3001';
  const email = `test_${Date.now()}@example.com`;
  
  console.log('Testing authentication endpoints...');
  console.log(`Using test email: ${email}`);
  
  try {
    // 1. Register a new user
    console.log('\n--- Testing Registration ---');
    const registerResponse = await fetch(`${baseUrl}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password: 'password123',
        name: 'Test',
        surname: 'User'
      })
    });
    
    const registerData = await registerResponse.json();
    console.log(`Status: ${registerResponse.status}`);
    console.log('Response:', registerData);
    
    if (!registerResponse.ok) {
      throw new Error(`Registration failed: ${registerResponse.status}`);
    }
    
    // 2. Login with the newly created user
    console.log('\n--- Testing Login ---');
    const loginResponse = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password: 'password123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log(`Status: ${loginResponse.status}`);
    console.log('Response:', {
      token: loginData.token ? '(JWT token present)' : '(missing)',
      user: loginData.user
    });
    
    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${loginResponse.status}`);
    }
    
    // 3. Test login with incorrect password
    console.log('\n--- Testing Login with Wrong Password ---');
    const badLoginResponse = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password: 'wrongpassword'
      })
    });
    
    const badLoginData = await badLoginResponse.json();
    console.log(`Status: ${badLoginResponse.status}`);
    console.log('Response:', badLoginData);
    
    // 4. Test login with non-existent user
    console.log('\n--- Testing Login with Non-existent User ---');
    const nonExistentResponse = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'nonexistent@example.com',
        password: 'password123'
      })
    });
    
    const nonExistentData = await nonExistentResponse.json();
    console.log(`Status: ${nonExistentResponse.status}`);
    console.log('Response:', nonExistentData);
    
    console.log('\n--- All tests completed ---');
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testAuth();
