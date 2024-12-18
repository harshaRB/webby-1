// Initialize Supabase Client
const SUPABASE_URL = "https://wwevvwgdonkknqzgbsoa.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3ZXZ2d2dkb25ra25xemdic29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MjUwMzgsImV4cCI6MjA1MDEwMTAzOH0.VskKxKSSewdZmatXYQLB6vsLZP0IsZMfz_pVVpBHky8";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// Check User Session on Page Load
supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      loadUserProfile(session.user);
    } else {
      showLoginForm();
    }
  });
  


// Handle Sign-Up
document.getElementById("signup").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
  
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
  
    if (error) {
      alert("Sign-Up Error: " + error.message);
    } else {
      alert("Sign-Up Successful! Please check your email to verify your account.");
    }
  });
  
  // Handle Login
  document.getElementById("login").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
  
    const { session, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  
    if (error) {
      alert("Login Error: " + error.message);
    } else {
      alert("Login Successful!");
      loadUserProfile(session.user);
    }
  });
  
  // Handle Logout
  document.getElementById("logout").addEventListener("click", async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Logout Error: " + error.message);
    } else {
      alert("Logged Out Successfully!");
      showLoginForm();
    }
  });
  
  // Load User Profile
  function loadUserProfile(user) {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("profile").style.display = "block";
    document.getElementById("user-email").innerText = user.email;
  }
  
  // Show Login Form
  function showLoginForm() {
    document.getElementById("profile").style.display = "none";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
  }
  


  supabase.auth.getSession().then(({ data: { session } }) => {
    if (!session) {
      alert("Please log in to access this page.");
      window.location.href = "login.html"; // Redirect to login page
    }
  });
  