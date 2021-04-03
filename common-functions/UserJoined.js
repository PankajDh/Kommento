import Constants from '../Constants';

const userJoined = async (matchId, currentState) => {
  const url = `${Constants.BACKEND_BASEURL}/users/join/match`;
  await fetch(url, {
    body: JSON.stringify({
      matchId,
      currentState,
      userId: global.userId,
    }),
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default userJoined;
