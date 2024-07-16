
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
   return (
    <HydrateClient>
      <h1>Update will be soon</h1>
    </HydrateClient>
  );
}
