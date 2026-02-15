function updateProfile({ name, bio, avatar }) {
  const users = getUsers();
  const session = Storage.get("session", null);
  if (!session) return;

  const me = users.find(u => u.id === session.userId);
  if (!me) return;

  if (!name.trim()) throw new Error("Name is required.");

  me.name = name.trim();
  me.bio = (bio || "").trim();
  me.avatar = (avatar || "").trim();

  saveUsers(users);
}
