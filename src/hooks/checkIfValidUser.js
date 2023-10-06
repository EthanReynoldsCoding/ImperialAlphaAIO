const checkIfValidUser = async (token) => {
  let validUser = false;

  const guildsRes = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const guilds = await guildsRes.json();

  let inGuild = false;

  const serverId = process.env.REACT_APP_DISCORD_SERVER_ID;

  let idx = 0;
  const guildsLength = guilds.length;

  while (idx < guildsLength && !inGuild) {
    if (guilds[idx].id === serverId) {
      inGuild = true;
    }
    idx++;
  }

  if (inGuild) {
    const rolesRes = await fetch(
      `https://discord.com/api/users/@me/guilds/${process.env.REACT_APP_DISCORD_SERVER_ID}/member`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { roles } = await rolesRes.json();
    const roleId = process.env.REACT_APP_DISCORD_ROLE_ID;

    const rolesLength = roles?.length;

    let i = 0;
    while (i < rolesLength && !validUser) {
      if (roles[i] === roleId) {
        validUser = true;
      }
      i++;
    }
  }

  return validUser;
};

export default checkIfValidUser;
