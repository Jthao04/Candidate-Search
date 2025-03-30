const searchGithub = async () => {
  try {
    console.log('GitHub Token:', import.meta.env.VITE_GITHUB_TOKEN);

    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    };
    console.log('Request Headers:', headers);

    const response = await fetch(
      `https://api.github.com/users?since=1`,
      { headers }
    );

    console.log('Response:', response);
    const data = await response.json();

    if (!response.ok) {
      console.error('Error Response:', response);
      throw new Error(`Error ${response.status}: ${data.message}`);
    }

    console.log('GitHub users fetched successfully:', data);
    return data;
  } catch (err) {
    console.error('Error fetching GitHub users:', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
