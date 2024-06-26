import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "../_components/Login";

export const dynamic = 'force-dynamic'; 

export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect("/");
  }

  return (
    <main className="max-w-lg m-auto">
      <h1 className="text-2xl text-center mb-6">Login</h1>
      <Login />
    </main>
  );
}