import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState(""); 

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    console.log(tabFromUrl);
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
    <div className="md:h-screen md:w-56 bg-[rgb(16,23,45)]"> {/* Full height for larger screens */}
      <DashSidebar />
    </div>
    <div className="flex-1"> {/* Use flex-1 to take remaining space */}
      {tab === "profile" && <DashProfile />}
    </div>
  </div>
);
}