
import { HydrateClient } from "~/trpc/server";
import Homepage from "./_components/Homepage";
import { cookies } from "next/headers";


export default async function Home() {
  const cookieStore = cookies();

  const userId = cookieStore.get('userId')?.value;
  const name = cookieStore.get('username')?.value;
   return (
    <HydrateClient>
      <Homepage userId={userId} name={name}/>
    </HydrateClient>
  );
}
