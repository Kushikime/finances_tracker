// Test protected endpoints with JWT authentication
const fetch = require('node-fetch');

async function testProtectedEndpoint() {
  const baseUrl = 'http://localhost:3001';
  const email = `test_${Date.now()}@example.com`;
  
  console.log('Testing protected endpoint flow...');
  console.log(`Using test email: ${email}`);
  
  try {
    // 1. Register a new user
    console.log('\n--- Step 1: Creating test user ---');
    const registerResponse = await fetch(`${baseUrl}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password: 'password123',
        name: 'Protected',
        surname: 'Test'
      })
    });
    
    if (!registerResponse.ok) {
      throw new Error(`Registration failed: ${registerResponse.status}`);
    }
    
    const userData = await registerResponse.json();
    console.log('User created with ID:', userData.id);
    
    // 2. Login to get token
    console.log('\n--- Step 2: Logging in to get token ---');
    const loginResponse = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password: 'password123'
      })
    });
    
    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${loginResponse.status}`);
    }
    
    const loginData = await loginResponse.json();
    const token = loginData.token;
    console.log('Retrieved token:', token ? 'Token received' : 'No token received');
    
    // 3. Try accessing protected endpoint without token
    console.log('\n--- Step 3: Accessing protected endpoint WITHOUT token ---');
    const noAuthResponse = await fetch(`${baseUrl}/api/user/profile`);
    
    console.log(`Status: ${noAuthResponse.status}`);
    console.log('Response:', await noAuthResponse.json());
    
    // 4. Try accessing protected endpoint with token
    console.log('\n--- Step 4: Accessing protected endpoint WITH token ---');
    const authResponse = await fetch(`${baseUrl}/api/user/profile`, {
      headers: { 
        'Authorization': `Bearer ${token}` 
      }
    });
    
    console.log(`Status: ${authResponse.status}`);
    if (authResponse.ok) {
      const profileData = await authResponse.json();
      console.log('Profile Data:', profileData);
    } else {
      console.log('Failed to retrieve profile:', await authResponse.json());
    }
    
    console.log('\n--- All tests completed ---');
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testProtectedEndpoint();
