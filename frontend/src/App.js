// import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
// import { getAllToDo } from "./utils/HandelAPI";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  // const [toDo, setToDo] = useState([]);

  // useEffect(() => {
  //   getAllToDo(setToDo);
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch("http://localhost:5000/").then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>

        <div className="top">
          <input type="text" placeholder="Add ToDos..." />

          <div className="add">Add</div>
        </div>

        <div className="list">
          {data?.map((data) => (
            <ToDo key={data._id} text={data.text} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
