document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(`Login successful.`);
      localStorage.token = data.token;
      window.location.href = "index.html";
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    alert("An error occurred. Please try again.");
  }
});
