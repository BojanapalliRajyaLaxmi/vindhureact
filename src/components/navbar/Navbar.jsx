// import React, { useState } from "react";
// import { FaHeart, FaSun, FaMoon, FaUserCircle, FaShoppingCart } from "react-icons/fa";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Dropdown, Space } from "antd";
// import { DownOutlined, SettingOutlined } from "@ant-design/icons";
// import "./Navbar.css";
// const Navbar = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };
//   const handleLoginClick = () => {
//     navigate("/login"); 
//   };

//   const handleSigninClick = () => {  
//     navigate("/register"); 
//   };
//   const menuItems = [
//     { key: "1", label: "My Account", disabled: true },
//     { key: "2", label: <Link to="/profile"><SettingOutlined /> Settings</Link> },
//     { type: "divider" },
//     { key: "3", label: <span onClick={handleLoginClick}>Log In</span> },  
//     { key: "4", label: <span onClick={handleSigninClick}>Sign Up</span> }, 
//   ];

//   return (
//     <nav id="nav" className={`navbar ${darkMode ? "dark" : "light"}`}>
//       <img src="/logoVindhu.png" alt="Logo" width={100} height={100} />
//       <ul className="nav-links">
//         <div className="nav-links-center">
//           <li className={location.pathname === "/" ? "active" : ""}>
//             <Link to="/">Home</Link>
//           </li>
//           <li className={location.pathname === "/restaurant" ? "active" : ""}>
//             <Link to="/restaurant">Nirvana</Link>
//           </li>
//           <li className={location.pathname === "/states" ? "active" : ""}>
//             <Link to="/states">States</Link>
//           </li>
//           <li className={location.pathname === "/feed" ? "active" : ""}>
//             <Link to="/feed">Feed</Link>
//           </li>
//           <li className={location.pathname === "/profile" ? "active" : ""}>
//             <Link to="/profile">Profile</Link>
//           </li>
//         </div>
//         <div className="nav-links-right">
//           <li><Link to="/cart"><FaShoppingCart /></Link></li>
//           <li className="wishlist-icon"><Link to="/wishlist"><FaHeart /></Link></li>
//           <li onClick={toggleDarkMode} className="dark-light-icon">
//             {darkMode ? <FaSun /> : <FaMoon />}
//           </li>
//           <li className="account-icon">
//             <Dropdown menu={{ items: menuItems }}>
//               <a onClick={(e) => e.preventDefault()}>
//                 <Space>
//                   <FaUserCircle size={20} /> <DownOutlined />
//                 </Space>
//               </a>
//             </Dropdown>
//           </li>
//         </div>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { FaHeart, FaSun, FaMoon, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import "./Navbar.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLoginClick = () => {
    navigate("/login"); 
  };

  const handleSigninClick = () => {  
    navigate("/register"); 
  };

  const menuItems = [
    { key: "1", label: "My Account", disabled: true, className: "ant-dropdown-menu-item-disabled" },
    { key: "2", label: <Link to="/profile"><SettingOutlined /> Settings</Link> },
    { key: "3", label: <Link to="/cart"><FaShoppingCart /> Cart</Link> },
    { key: "4", label: <Link to="/wishlist"><FaHeart /> Wishlist</Link> },
    { type: "divider", className: "ant-dropdown-menu-item-divider" },
    { key: "5", label: <span onClick={handleLoginClick}>Log In</span> },
    { key: "6", label: <span onClick={handleSigninClick}>Sign Up</span> }
  ];
  

  return (
    <nav id="nav" className={`navbar ${darkMode ? "dark" : "light"}`}>
      <img src="/logoVindhu.png" alt="Logo" width={100} height={100} />
      <ul className="nav-links">
        <div className="nav-links-center">
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === "/restaurant" ? "active" : ""}>
            <Link to="/restaurant">Nirvana</Link>
          </li>
          <li className={location.pathname === "/states" ? "active" : ""}>
            <Link to="/states">States</Link>
          </li>
          <li className={location.pathname === "/feed" ? "active" : ""}>
            <Link to="/feed">Feed</Link>
          </li>
          <li className={location.pathname === "/profile" ? "active" : ""}>
            <Link to="/profile">Profile</Link>
          </li>
        </div>
        <div className="nav-links-right">
          <li onClick={toggleDarkMode} className="dark-light-icon">
            {darkMode ? <FaSun /> : <FaMoon />}
          </li>
          <li className="account-icon">
            <Dropdown menu={{ items: menuItems }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <FaUserCircle size={20} /> <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
