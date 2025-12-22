import { DB } from "../lib/database";
import { Godparent_Pronouns } from "../shared/types/prisma-types";

async function main() {
  // Create a new user with a post
  const user = await DB.godparents.create({
    data: {
      name: "Alice",
      unique_id: "nano1234",
      password: "alice123",
      pronouns: Godparent_Pronouns.NINANG,
    },
  });
  console.log("Created Godparent:", user);

  // Fetch all users with their posts
  const allUsers = await DB.godparents.findMany();
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await DB.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await DB.$disconnect();
    process.exit(1);
  });
