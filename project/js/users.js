function listOtherUsers() {
  const me = requireLogin();
  const users = getUsers();
  return users.filter(u => u.id !== me.id);
}

function toggleFollow(userIdToFollow) {
  const users = getUsers();
  const session = Storage.get("session", null);
  if (!session) return;

  const me = users.find(u => u.id === session.userId);
  if (!me) return;

  const isFollowing = me.following.includes(userIdToFollow);
  me.following = isFollowing
    ? me.following.filter(id => id !== userIdToFollow)
    : [...me.following, userIdToFollow];

  saveUsers(users);
}
