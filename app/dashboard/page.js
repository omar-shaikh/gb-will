import React from "react";
import WelcomeMessage from "../components/dashboard-comp/WelcomeMessage";
import CardGrid from "../components/dashboard-comp/Cards";
import DisplayUserData from "../components/dashboard-comp/EstateForm/DisplayUserData";

const Dashboard = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[67%] mx-auto">

        <div className="mt-10 mb-10">
          <WelcomeMessage />
        </div>

        <div className="mb-20">
          <DisplayUserData />
        </div>
        
        <div className="mb-20">
          <CardGrid />
        </div>


      </div>
    </div>
  );
};

export default Dashboard;
