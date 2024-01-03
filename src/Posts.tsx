import { useQuery } from "@tanstack/react-query";
import { client } from "~/App";

export default function Posts() {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await client.post.all.$get();
      return await res.json();
    },
  });

  return (
    <div>
      {query.isLoading ? (
        <div>Loading</div>
      ) : (
        <ul>
          {query.data?.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
