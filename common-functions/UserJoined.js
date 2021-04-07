import Constants from '../Constants';

const userJoined = async (commentaryId, currentState) => {
  const url = `${Constants.BACKEND_BASEURL}/users/join/commentary`;
  await fetch(url, {
    body: JSON.stringify({
      commentaryId,
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
