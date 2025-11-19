import React, { useState, useRef } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";


// "Hold" behavior: dropdown stays open until you hover another nav or click away

function Navbar() {
  const navigate = useNavigate()
  // openIndex: which menu's dropdown is open, or null for none
  const [openIndex, setOpenIndex] = useState(null);
  const navRef = useRef(null);

  // Optional: close menu if click outside navigation bar
  React.useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenIndex(null);
      }
    };
    if (openIndex !== null) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openIndex]);

  const menus = [
    {
      label: "Assistant",
      content: (
        <NavigationMenuContent>
          <NavigationMenuLink>Assist</NavigationMenuLink>
        </NavigationMenuContent>
      ),
    },
    {
      label: "Notes",
      content: (
        <NavigationMenuContent>
          <NavigationMenuLink>generate notes</NavigationMenuLink>
        </NavigationMenuContent>
      ),
    },
    {
        label: "profile",
        content: (
          <NavigationMenuContent>
            <NavigationMenuLink>generate notes</NavigationMenuLink>
          </NavigationMenuContent>
        ),
      },
    {
        label: "Resources",
        content: (
          <NavigationMenuContent>
            <NavigationMenuLink>generate notes</NavigationMenuLink>
          </NavigationMenuContent>
        ),
      },
      {
        label: "learn",
        content: (
          <NavigationMenuContent>
            <NavigationMenuLink>generate notes</NavigationMenuLink>
          </NavigationMenuContent>
        ),
      },
    {
      label: "Docs",
      content: (
        <NavigationMenuContent>
          <NavigationMenuLink>API Reference</NavigationMenuLink>
          <NavigationMenuLink>Api Pricing</NavigationMenuLink>
          <NavigationMenuLink>Learn</NavigationMenuLink>
        </NavigationMenuContent>
      ),
    },
    {
      label: "pricing",
      content: (
        <NavigationMenuContent>
          <NavigationMenuLink>API</NavigationMenuLink>
          <NavigationMenuLink>Plans</NavigationMenuLink>
        </NavigationMenuContent>
      ),
    },
  ];

  return (
    <div ref={navRef} className="flex justify-around items-center mt-2">
      <div>
        <h1 className="text-2xl font-black">Vocalyst</h1>
      </div>

      <div>
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu, i) => (
              <NavigationMenuItem
                key={menu.label}
                // Open dropdown on hover or focus/click
                onMouseEnter={() => setOpenIndex(i)}
                onFocus={() => setOpenIndex(i)}
                // No onMouseLeave/onBlur: menu stays open until another menu hovered/clicked or click outside nav
                style={{ position: "relative" }}
              >
                <NavigationMenuTrigger
                  tabIndex={0}
                  aria-expanded={openIndex === i}
                  onClick={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                >
                  {menu.label}
                </NavigationMenuTrigger>
                {/* Dropdown stays open ("holds") as long as openIndex === i */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    display: openIndex === i ? "block" : "none",
                  }}
                >
                  {menu.content}
                </div>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-3">
        <button  onClick={()=>{navigate("/login")}}className="flex rounded-2xl items-center justify-center text-black bg-white border border-black text-md px-4 py-[0.5px] text-center">
          log in
        </button>
        <button  onClick={()=>{navigate("/signup")}}className="flex items-center justify-center rounded-2xl px-4 py-[0.8px] text-white bg-black text-md text-center">
          sign up
        </button>
      </div>
    </div>
  );
}

export default Navbar;
