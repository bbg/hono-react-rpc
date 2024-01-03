import { useMutation } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { client, queryClient } from "~/App";

const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length: number) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const SubmitPost = () => {
  const $post = client.post.submit.$post;

  const mutation = useMutation<
    InferResponseType<typeof $post>,
    Error,
    InferRequestType<typeof $post>["json"]
  >({
    mutationFn: async (todo) => {
      const res = await $post({ json: todo });
      return await res.json();
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  return (
    <div>
      <button
        onClick={() => {
          mutation.mutate({
            id: Math.floor(Math.random() * 999),
            title: generateString(50),
            userId: Math.floor(Math.random() * 999),
            completed: true,
          });
        }}
      >
        Add Post
      </button>
    </div>
  );
};
