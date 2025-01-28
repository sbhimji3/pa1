export const postName = async (name) => {
  const data = { name: name };

  try {
    const response = await fetch('https://ca15de59-957a-4b6e-9dfc-f158c87aad6d.us-east-1.cloud.genez.io/visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(response)

    const json = await response.json(); // Wait for the response to be converted to JSON
    const { name, visits } = json; // Destructure the response
    return { name, visits };
  } catch (error) {
    console.error('Error during POST request:', error);
  }
}