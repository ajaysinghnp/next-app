import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
