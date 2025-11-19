import React from "react";

export const NavigationMenu = ({ children, className = "", ...props }) => (
  <nav className={`relative ${className}`} {...props}>{children}</nav>
);

export const NavigationMenuList = ({ children, className = "", ...props }) => (
  <ul className={`flex items-center gap-2 ${className}`} {...props}>{children}</ul>
);

export const NavigationMenuItem = ({ children, className = "", ...props }) => (
  <li className={className} {...props}>{children}</li>
);

export const NavigationMenuTrigger = ({ children, className = "", ...props }) => (
  <button className={`px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md ${className}`} {...props}>
    {children}
  </button>
);

export const NavigationMenuContent = ({ children, className = "", ...props }) => (
  <div className={`absolute mt-2 rounded-md border border-gray-200 bg-white shadow-md p-3 ${className}`} {...props}>
    {children}
  </div>
);

export const NavigationMenuLink = ({ children, className = "", href = "#", ...props }) => (
  <a href={href} className={`text-sm text-gray-700 hover:text-gray-900 ${className}`} {...props}>
    {children}
  </a>
);

export const NavigationMenuIndicator = ({ className = "", ...props }) => (
  <div className={`h-0.5 bg-gray-900 ${className}`} {...props} />
);

export const NavigationMenuViewport = ({ children, className = "", ...props }) => (
  <div className={`relative ${className}`} {...props}>{children}</div>
);

export default NavigationMenu;
