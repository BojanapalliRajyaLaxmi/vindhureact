// import React, { useState } from "react";
// import "./Home.css";
// import CitiesSlider from "../corosel/CitiesSlider";
// import Footer from "../footer/Footer";
// import HomeSection from "./HomeSection";
// import FoodGallery from "./FoodGallery";
// import FoodCategories from "./FoodCategory";
// const Home = () => {
//   return (
//     <div className="home-container">
//       <div className="content">
//         <CitiesSlider/>
//       <HomeSection />
//       <FoodCategories/>
//       <div
//       className="dt-sc-section-wrapper"
//       style={{
//         // backgroundPosition: "center center",
//         backgroundSize: "contain",
//         backgroundRepeat: "no-repeat",
//         backgroundImage: "url('https://orgass.myshopify.com/cdn/shop/files/news.png?v=1639553098')",
//         padding:"50px"
//       }}
//     >
//       <div className="container-fluid">
//         <div className="row home-newsletter-page">
//           <div className="section-head dt-sc-heading text-start">
//             <h4 className="dt-sc-sub-heading">Newsletter</h4>
//             <h2 className="dt-sc-main-heading">Get our recipes now</h2>
//           </div>

//           <div className="dt-sc-newsletter-section default text-start">
//             <div className="dt-sc-newsletter-form">
//               <form method="post" action="/contact#contact_form" id="contact_form" acceptCharset="UTF-8" className="contact-form">
//                 <input type="hidden" name="form_type" value="customer" />
//                 <input type="hidden" name="utf8" value="✓" />

//                 <div className="contact-input">
//                   <input
//                     type="email"
//                     placeholder="Your email address"
//                     name="contact[email]"
//                     className="mail"
//                     aria-label="Your email address"
//                     required
//                   />
//                   <input type="hidden" name="contact[tags]" value="newsletter" />
//                   <button type="submit" className="dt-sc-btn" name="subscribe">
//                     <span>Subscribe</span>
//                   </button>
//                 </div>
//               </form>
//               <p className="dt-sc-newsletter-description">Stay always in touch! Subscribe to our newsletter.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//       </div>
//       <FoodGallery/>
//       <Footer />
//     </div>
//   );
// };

// export default Home;
import React from "react";
import "./Home.css";
import CitiesSlider from "../corosel/CitiesSlider";
import Footer from "../footer/Footer";
import HomeSection from "./HomeSection";
import FoodGallery from "./FoodGallery";
import FoodCategories from "./FoodCategory";
import Newsletter from "./Newsletter"; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        <CitiesSlider />
        <HomeSection />
        <FoodCategories />
        <Newsletter />
        <FoodGallery />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
