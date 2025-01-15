import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "./Button";

const Loginpagemain = () => {
const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState ({ emailError: '', passwordError: ''});
  const [showSuccess, setShowSuccess] = useState(false);              
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
  };




  const handleLogin = async (e = null) => {
    if (e) e.preventDefault();           


    let emailError = '';
    let passwordError = '';

 
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

   




     navigate('/dashboard');
     


  } else {
    const errorData = await response.json();  
    console.error("API Error:", errorData);
    alert(errorData.message || "Login failed!");
  }

} catch (error) {
  console.error("Error during API call:", error);
  alert("Something went wrong! Please try again.");
}
};


    return (

        <div className="grid grid-cols-2 h-screen">
     
        <div className="bg-black relative overflow-hidden">
         
           <div className="absolute inset-0 flex items-center justify-center text-7xl text-gray-400 font-extrabold animate-scroll">
           My React Login
              </div>
          </div>
    
      
        <div className="flex items-center justify-center bg-gray-100 relative">
      
         {showSuccess && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Login Successful!
        </div>
         )}

    
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login Page</h2>
    
         
   
          <input
            type="text"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
    
        
           {error.emailError && <p className="text-red-500 text-sm">{error.emailError}</p>}
    
        
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
    
          
               {error.passwordError && <p className="text-red-500 text-sm">{error.passwordError}</p>}
    
      
          <div onClick={handleLogin}>{<Button/>}</div>
          </form>
          </div>
          </div>
      );
    };

export default Loginpagemain;