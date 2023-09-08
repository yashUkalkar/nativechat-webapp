interface LiveUser {
  [user_id: string]: string;
}

const users: LiveUser = {};

const addUserToLiveList = (user_id: string, socket_id: string) => {
  users[user_id] = socket_id;
};

const removeUserFromLiveList = (user_id: string) => {
  if (user_id) delete users[user_id];
};

export { addUserToLiveList, removeUserFromLiveList };
