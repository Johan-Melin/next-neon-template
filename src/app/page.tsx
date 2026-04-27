import { sql } from "@/lib/db";

export default async function Home() {
  try {
    await sql`SELECT 1`;
    return <h1>db connected</h1>;
  } catch (error) {
    console.error(error);
    return <h1>db not connected</h1>;
  }
}


