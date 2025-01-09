import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, []);
  const handleUserDetail = async (id) => {
    const res = await fetch(`/api/data/${id}`);
    const data = await res.json();
    console.log("data", data);
  };
  const postHandler = async () => {
    const res = await fetch("/api/data", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div>
      <h3>Connecting database to Next</h3>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={postHandler}>Post</button>
      </div>
      <div>
        <ul>
          {users.map((user) => (
            <div key={user._id}>
              <li>{user.name}</li>
              <button onClick={() => handleUserDetail(user._id)}>
                user detail
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
