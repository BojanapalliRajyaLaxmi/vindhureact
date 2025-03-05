// // import { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import "./login.css"; // Import the CSS file

// // const Login = () => {
// //     const [formData, setFormData] = useState({ email: "", password: "" });
// //     const [message, setMessage] = useState("");

// //     const handleChange = (e) => {
// //         setFormData({ ...formData, [e.target.name]: e.target.value });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             let response = await axios.post("http://localhost:3002/login", formData);
// //             setMessage("Login successful!");
// //             localStorage.setItem("tokenlogin", response.data.token);
// //             window.location.href = "http://localhost:5173/feed";
// //         } catch (error) {
// //             console.error("Login failed:", error);
// //             setMessage("Login failed! Check credentials.");
// //         }
// //     };

// //     return (
// //         <div className="login-container">
// //                 <img src="/public/logoVindhu.png" alt="Logo" />
// //             <div className="login-form">
// //                 <h2>Login</h2>
// //                 <form onSubmit={handleSubmit}>
// //                     <label htmlFor="email">Email</label>
// //                     <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required /><br />

// //                     <label htmlFor="password">Password</label>
// //                     <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required /><br />

// //                     <input type="submit" value="Login" />
// //                 </form>
// //                 <p>{message}</p>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Login;
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./login.css";

// const Login = () => {
//     const [formData, setFormData] = useState({ email: "", password: "" });
//     const [message, setMessage] = useState("");
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             let response = await axios.post("http://localhost:3002/login", formData);
//             setMessage("Login successful!");
    
//             localStorage.setItem("tokenlogin", response.data.token);
    
//             // ✅ Fix: Check if response.data.user exists before accessing properties
//             if (response.data.user) {
//                 localStorage.setItem("userEmail", response.data.user.email);
//                 localStorage.setItem("userName", response.data.user.name);
//             } else {
//                 console.error("User data is missing from response");
//                 setMessage("Login failed! User data not found.");
//                 return;
//             }
    
//             // ✅ Redirect to /feed after successful login
//             navigate("/feed");
//         } catch (error) {
//             console.error("Login failed:", error);
//             setMessage("Login failed! Check credentials.");
//         }
//     };
    
    

//     return (
//         <div className="login-container">
//             <img src="/public/logoVindhu.png" alt="Logo" />
//             <div className="login-form">
//                 <h2>Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor="email">Email</label>
//                     <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required /><br />

//                     <label htmlFor="password">Password</label>
//                     <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required /><br />

//                     <input type="submit" value="Login" />
//                 </form>
//                 <p>{message}</p>
//             </div>
//         </div>
//     );
// };

// export default Login;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import Footer from '../footer/Footer'

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post("http://localhost:3002/login", formData);
            toast.success("Login successful!", { position: "top-center" });

            localStorage.setItem("tokenlogin", response.data.token);

            if (response.data.user) {
                localStorage.setItem("userEmail", response.data.user.email);
                localStorage.setItem("userName", response.data.user.name);
            } else {
                toast.error("User data not found!", { position: "top-center" });
                return;
            }

            setTimeout(() => navigate("/feed"), 1000);
        } catch (error) {
            toast.error("Login failed! Check credentials.", { position: "top-center" });
        }
    };

    return (
        <>
        <div>
        <div className="login-container">
            <ToastContainer />
            <img src="/public/logoVindhu.png" alt="Logo" />
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required /><br />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required /><br />

                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
        <Footer/>
            </div>
            </>
    );
};

export default Login;
