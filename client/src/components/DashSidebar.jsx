import { Sidebar } from "flowbite-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useDispatch } from "react-redux";


export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState(""); 
    const dispatch = useDispatch();
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get("tab");
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);

    const handleSignOut = async () => {
      try {
        const res = await fetch('/api/auth/signout', {
          method: 'POST',
        });
        const data = await res.json();
        
        if (data.success === false) {
          console.error(data.message);
          return;
        }
        
       
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <Sidebar className="w-full md:w-56 md:min-h-screen">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to="/dashboard?tab=profile">
              <Sidebar.Item 
                active={tab === "profile"} 
                icon={HiUser} 
                label={"User"} 
                labelColor="dark"
                as={"div"}
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Sidebar.Item 
              icon={HiArrowSmRight} 
              className="cursor-pointer" 
              onClick={handleSignOut}
            >
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    );
}