const apiUrl = "https://taskmaster-project-hi5d.onrender.com";

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  register();
});

const register = async () => {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      window.location.href = "login.html";
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    alert("An error occurred. Please try again.");
  }
};
