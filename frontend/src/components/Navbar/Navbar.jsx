import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";


function Navbar() {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];

  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
  const role = useSelector((state)=> state.auth.role);
  // console.log(isLoggedIn);

  if(isLoggedIn==false){
    links.splice(2,3);
  }

  if(isLoggedIn == true && role==="user"){
    links.splice(4,1);
  }

  if(isLoggedIn == true && role==="admin"){
    links.splice(3,1);
  }

  const [MobileNav, setMobileNav] = useState("hidden");
  return (
    <>
    <nav className="z-50 flex relative bg-zinc-800 text-white px-8 py-3 items-center justify-between">
      <div className="flex items-center">
        <img
          className="h-10 mr-4"
          src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
          alt="logo"
        />
        <Link to={links[0].link} className="text-2xl font-semibold">BookHeaven</Link>
      </div>
      <div className="nav-links-bookheaven block md:flex items-center gap-4">
        <div className="md:flex gap-4 hidden">
          {links.map((items, index) => (
            <div className="flex items-center" key={index}>
              {items.title === "Profile" || items.title === "Admin Profile" ? (
                <Link to={items.link} key={index} className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
                  {items.title}
                </Link>
              ) : (
                <Link to={items.link}
                className="hover:text-blue-500 transition-all duration-300"
              >
                {items.title}
              </Link>
              )}
            </div>
          ))}
        </div>

        {isLoggedIn === false && (
          <div className="md:flex gap-4 hidden">
          <Link to="/LogIn" className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
            LogIn
          </Link>
          <Link to="/SignUp" className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
            SignUp
          </Link>
        </div>
        )}
        
        <div className="flex items-center">

        </div>

        <button className="text-white text-2xl hover:text-zinc-400 md:hidden " onClick={()=> MobileNav==="hidden" ? setMobileNav("block") : setMobileNav("hidden")}>
            <FaGripLines />
        </button>
      </div>
    </nav>
    <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
    {links.map((items, index) => (
        <React.Fragment key={index}>
            {items.title === "Profile" ? (
              <Link to={items.link} key={index} onClick={()=> MobileNav==="hidden" ? setMobileNav("block") : setMobileNav("hidden")} className="mb-8 px-8 py-2 font-semibold border text-3xl border-blue-500 rounded hover:bg-white hover:text-zinc-800 text-white transition-all duration-300">
                {items.title}
              </Link>
            ) : (
               <Link to={items.link}
               className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 text-center transition-all duration-300"
               key={index}
               onClick={()=> MobileNav==="hidden" ? setMobileNav("block") : setMobileNav("hidden")}
             >
               {items.title}{" "}
             </Link>
            )}
        </React.Fragment>
    ))}
        {isLoggedIn === false && (
          <>
            <Link to="/LogIn" onClick={()=> MobileNav==="hidden" ? setMobileNav("block") : setMobileNav("hidden")} className={`${MobileNav} mb-8 px-8 py-2 font-semibold border text-3xl border-blue-500 rounded hover:bg-white hover:text-zinc-800 text-white transition-all duration-300`}>
            LogIn
          </Link>
          <Link to="/SignUp" onClick={()=> MobileNav==="hidden" ? setMobileNav("block") : setMobileNav("hidden")} className={`${MobileNav} mb-8 px-8 py-2 font-semibold text-3xl bg-blue-500 text-white rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>
            SignUp
          </Link>
          </>
        )}
    </div>
    </>
    );
}

export default Navbar;
