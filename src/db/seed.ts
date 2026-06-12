import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "./index";
import { admins } from "./schema";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME;

  if (!email || !password) {
    throw new Error(
      "SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set to seed an admin",
    );
  }

  const existing = await db
    .select({ id: admins.id })
    .from(admins)
    .where(eq(admins.email, email));

  if (existing.length > 0) {
    console.log(`Admin with email ${email} already exists, skipping.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(admins).values({
    email,
    passwordHash,
    name: name ?? null,
  });

  console.log(`Created admin account for ${email}.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
