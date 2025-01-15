import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "./Button";
import Dashboardpagemain from "./Dasboard";

const Loginpagemain = () => {
const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState ({ emailError: '', passwordError: ''});
  const [showSuccess, setShowSuccess] = useState(false); // For success message
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    return emailRegex.test(email);
  };


  // Function to handle login

  // const handleLogin = (e) => {
  //   e.preventDefault();            // To prevent the default form submit action

  const handleLogin = async (e = null) => {
    if (e) e.preventDefault();            // To prevent the default form submit action


    let emailError = '';
    let passwordError = '';

    // Basic Validation for empty fields
    if (!isValidEmail (username)) {
      emailError = 'Invalid Email.';
    }

    if (password.length < 6 ){
      passwordError = 'password must be atleast 6 characters long';
    }

    if(emailError || passwordError){
      setError({emailError,passwordError});
      return;
    }

    setError({ emailError:'', passwordError:''});

       // Login API call
       try {
        const response = await fetch("https://dae4ebe4-bd07-4680-b672-e008113837ee.mock.pstmn.io/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },  
          body: JSON.stringify({
            email: username,
            password: password
          })
        });
  
        if (response.ok) {
          const data = await response.text();
          console.log("API Response:", data);

          // Secondary API Call



// API Call after successful login

    // alert('login Successful');

     // Navigate to Dashboard
     navigate('/dashboard');
     
    // setShowSuccess(true); // Show success message  and navigate to dashboard
    // setTimeout(() => {
    //   setShowSuccess(false); // Hide after 3 seconds
    //   navigate('/dashboard'); // Redirect to Dashboard  // yaha per humne app.js me route path copy kara hai.
    // }, 3000); // 3 seconds delay

  } else {
    const errorData = await response.json();  // Handle error response
    console.error("API Error:", errorData);
    alert(errorData.message || "Login failed!");
  }
//   setError({
//     emailError: "",
//     passwordError: errorData.message || "Invalid email or password.",
//   });
// }
} catch (error) {
  console.error("Error during API call:", error);
  alert("Something went wrong! Please try again.");
}
};


    return (

        <div className="grid grid-cols-2 h-screen">
        {/* Left Half: Black Background */}
        <div className="bg-black relative overflow-hidden">
           {/* Animation Overlay */}
           <div className="absolute inset-0 flex items-center justify-center text-7xl text-gray-400 font-extrabold animate-scroll">
           My React Login
              </div>
          </div>
    
         {/* Right Half: Login Form */}
        <div className="flex items-center justify-center bg-gray-100 relative">
         {/* Success Pop-up */}
         {showSuccess && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Login Successful!
        </div>
         )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login Page</h2>
    
         
          {/* Username Input */}
          <input
            type="text"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
    
           {/* Show email error */}
           {error.emailError && <p className="text-red-500 text-sm">{error.emailError}</p>}
    
          {/* Password Input */}
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
    
               {/* Show password error */}
               {error.passwordError && <p className="text-red-500 text-sm">{error.passwordError}</p>}
    
          {/* Login Button */}
          <div onClick={handleLogin}>{<Button/>}</div>
          </form>
          </div>
          </div>
      );
    };

export default Loginpagemain;