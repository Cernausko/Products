export async function getProductPage(pageNumber) {
    try {
        console.log(`getting product page ${pageNumber}`)
      const response = await fetch(`https://demo-api.ideabridge.lt/api/products/view/all?page=${pageNumber}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error during fetch: ${error.message}`);
    }
  }

export async function getProductById(authToken, productId) {
  try {
    const response = await fetch(`https://demo-api.ideabridge.lt/api/products/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      }
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

export async function getProducts(authToken, page) {
  try {
    const response = await fetch(`https://demo-api.ideabridge.lt/api/products?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
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

export async function uploadProduct(authToken, product) {
  console.log("trying to upload")
  try {
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('price', product.price);
    formData.append('image', product.image);
    formData.append('description', product.description);

    const response = await fetch('https://demo-api.ideabridge.lt/api/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      body: formData
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

export async function updateProduct(authToken, updatedProduct, productId) {
  try {
    const formData = new URLSearchParams();
    formData.append('title', updatedProduct.title);
    formData.append('price', updatedProduct.price);
    formData.append('description', updatedProduct.description);

    console.log("updating with data:")
    console.log(updatedProduct)
    const response = await fetch(`https://demo-api.ideabridge.lt/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      body: formData
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

export async function deleteProduct(authToken, productId) {
  try {
    const response = await fetch(`https://demo-api.ideabridge.lt/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
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