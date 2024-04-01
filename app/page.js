import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../lib/db";
import Logout from "./_components/Logout";

export const dynamic = 'force-dynamic'; 

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/login");
  }

  const notes = await prisma.note.findMany({
    where: { userId: data.user.id },
  });
  return (
    <main>
      <Logout />
      <h1 className="text-2xl text-center mb-8">Protected page</h1>
      <pre>{JSON.stringify({ user: data.user, notes }, null, 4)}</pre>
    </main>
  );
}