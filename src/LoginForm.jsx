import { useState, useEffect } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));


  const validate = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrors({});

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (res.ok) {
        setMessage("Login successful");

        localStorage.setItem("user", JSON.stringify({ username }));

        setIsLoggedIn(true); // 👈 add this

        setUsername("");
        setPassword("");
      }

    } catch (error) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-80 text-center">
          <h2 className="text-xl font-semibold mb-4">
            Welcome, {user?.username || "User"}
          </h2>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              setIsLoggedIn(false);
            }}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-80 flex flex-col gap-3"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {message && (
          <p className="text-center text-green-600 text-sm">{message}</p>
        )}
      </form>
    </div>
  );
}

export default LoginForm;

// const container = {
//   height: "100vh",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   background: "#f5f5f5",
// };

// const card = {
//   background: "white",
//   padding: "30px",
//   borderRadius: "10px",
//   width: "300px",
//   boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
//   display: "flex",
//   flexDirection: "column",
//   gap: "10px",
// };

// const title = {
//   textAlign: "center",
// };

// const input = {
//   padding: "10px",
//   borderRadius: "5px",
//   border: "1px solid #ccc",
// };

// const button = {
//   padding: "10px",
//   border: "none",
//   background: "#6c63ff",
//   color: "white",
//   borderRadius: "5px",
//   cursor: "pointer",
// };

// const logoutBtn = {
//   padding: "10px",
//   border: "none",
//   background: "red",
//   color: "white",
//   borderRadius: "5px",
//   cursor: "pointer",
// };

// const error = {
//   color: "red",
//   fontSize: "12px",
// };

// const messageStyle = {
//   textAlign: "center",
//   color: "green",
// };