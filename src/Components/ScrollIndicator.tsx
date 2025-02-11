import { useState, useEffect } from "react";

const ScrollIndicator = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY <= 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-6 z-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      } md:hidden`}
    >
      <div className="w-6 h-12 border-4 border-purple-600 rounded-full flex justify-center items-start p-1 animate-pulse">
        <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
