import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { hc } from "hono/client";
import { Fragment, useEffect, useState } from "react";
import Posts from "~/Posts";
import { AppType } from "~/server";
import { SubmitPost } from "~/SubmitPost";

export const queryClient = new QueryClient();

export const client = hc<AppType>(
  !import.meta.env.PROD
    ? "http://localhost:8787"
    : "https://hono-rpc-react.batuhangoksu.workers.dev"
);

export default function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData(true);
    }
  }, []);

  if (!data) return <Fragment />;

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <span>Is prod: {String(import.meta.env.PROD)}</span>
        <Posts />
        <SubmitPost />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
