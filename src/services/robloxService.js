const axios = require('axios');

async function getRobloxUserByName(username) {
  try {
    const response = await axios.get('https://users.roblox.com/v1/usernames/users', {
      params: { usernames: [username] },
      timeout: 10000
    });

    const data = response.data?.data?.[0];
    if (!data) return null;

    return {
      id: data.id,
      name: data.name,
      displayName: data.displayName
    };
  } catch (error) {
    console.error('Error al consultar Roblox:', error.message);
    return null;
  }
}

module.exports = { getRobloxUserByName };
