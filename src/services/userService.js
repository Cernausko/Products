

export async function postRequest(apiUrl, requestData) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log(responseData)
      return (responseData);
    } catch (error) {
      console.error('Error making POST request:', error.message);
      return null;
    }
  }

export async function loginUser(loginCredentials) {
  console.log("login attempt")
  try {
    const response = await fetch('https://demo-api.ideabridge.lt/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginCredentials),
    });

    const responseData = await response.json();
    return (responseData);
  } catch (error) {
    console.error('Error making POST request:', error.message);
    return null;
  }
}

export async function checkLoginStatus(authToken) {
  try {
    const response = await fetch('https://demo-api.ideabridge.lt/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Data:', data);
      return data;
    } else {
      console.error('Error:', response.status, response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

export async function logoutUser(authToken) {
  console.log("login attempt")
  try {
    const response = await fetch('https://demo-api.ideabridge.lt/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData)
    return (responseData);
  } catch (error) {
    console.error('Error making POST request:', error.message);
    return null;
  }
}

export async function registerUser(regData) {
  console.log("register attempt")
  try {
    const response = await fetch('https://demo-api.ideabridge.lt/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(regData),
    });

    const responseData = await response.json();
    return (responseData);
  } catch (error) {
    console.error('Error making POST request:', error.message);
    return null;
  }
}