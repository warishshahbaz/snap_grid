import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Grid } from "~/components/Grid";
import { fetchBackend } from "~/utils/backend.server";

export async function loader() {
  const data = await fetchBackend("get-user-config");
  return json(data);
}

export default function UserView() {
  const quizConfig = useLoaderData();

  return (
    <div>
      <Grid initialItems={quizConfig} />
    </div>
  );
}
