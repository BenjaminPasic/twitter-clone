import useAxios from "../hooks/useAxios";

export default function Home() {
  const { data, isPending } = useAxios(
    "https://jsonplaceholder.typicode.com/todos/1",
    "GET"
  );

  return (
    <div>
      {isPending && <p>Loading...</p>}
      <div>{data && <p>{data.userId}</p>}</div>
    </div>
  );
}
