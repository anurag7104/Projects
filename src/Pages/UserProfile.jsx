import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { AnimatePresence } from "framer-motion";
import { MainSpinner, TemplateDesignPin } from "../Components";
import useTemplates from "../hooks/useTemplates";
import { useQuery } from "react-query";
import { getSavedResumes } from "../Api";

const UserProfile = () => {
  const { data: user } = useUser();
  const { activeTab, setActiveTab } = useState("collections");

const {
  data:templates,
  isLoading:temp_isLoading,
  isError:temp_isError,
  
}=useTemplates();


const {data:savedResumes}=useQuery(["savedResumes"],()=>getSavedResumes(user?.uid))


// useEffect(()=>{
//   if(!user){
// navigate('/auth ',{repalce:true})  }
// },[]);


if(temp_isLoading){
  return <MainSpinner/>
}


  return (
    <div className=" w-full flex flex-col items-center justify-start py-12">
      <div className=" w-full h-72 bg-blue-50">
        <img
          src="https://unsplash.com/photos/the-sun-is-setting-over-the-mountains-in-the-desert-El92hmAt91o"
          alt=""
        />
        <div className=" flex items-center justify-center flex-col gap-4">
          {user?.photoURL ? (
            <React.Fragment>
              <img
                src={user?.photoURL}
                className=" W-24 h-24 rounded-full border-2 border-white -mt-12 shadow-md"
                referrerPolicy=" no-referrer"
                loading="lazy"
              />
            </React.Fragment>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          <p className=" text-2xl text-txtDark"> user?.displayName</p>
        </div>
        {/* Tabs */}
        <div className=" flex items-center justify-center mt-12">
          <div
            className={`px-4 py-2 rounded-md items-center justify-center flex gap-2 group cursor-pointer `}
            onClick={() => setActiveTab("collections")}
          >
            <p
              className={` text-base text-textPrimary group-hover:text-blue-600 px-4 py-1 rounded-full ${
                activeTab === "collections" &&
                "bg-white shadow-md text-blue-500"
              }`}
            >
              Collections
            </p>
          </div>

          <div
            className={`px-4 py-2 rounded-md items-center justify-center flex gap-2 group cursor-pointer `}
            onClick={() => setActiveTab("resumes")}
          >
            <p
              className={` text-base text-textPrimary group-hover:text-blue-600 px-4 py-1 rounded-full ${
                activeTab === "resumes" && "bg-white shadow-md text-blue-500"
              }`}
            >
              My Resumes
            </p>
          </div>
        </div>

        {/* Tab content */}
        <div className=" w-full gird grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 px-4 py-6">
          <AnimatePresence>
            {activeTab === "collections" && (
              <React.Fragment>
                {user?.collections.length > 0 && user?.collections ? (
                  <RenderATemplate templates={templates?.filter((temp)=>
                    user?.collections?.includes(temp?._id))} /> 
                ) : (
                  <div className=" col-span-12 w-full flex flex-col items-center justify-center gap-3 ">
                    <img src={NoData}
                    className=" w-32 h-auto object-contain" />
                    <p>No DATA</p>
                  </div>
                )}
              </React.Fragment>
            )}
            {activeTab === "resumes" && (
              <React.Fragment>
                {savedResumes?.length > 0 &&savedResumes ? (
                  <RenderATemplate templates={savedResumes} /> 
                ) : (
                  <div className=" col-span-12 w-full flex flex-col items-center justify-center gap-3 ">
                    <img src={NoData}
                    className=" w-32 h-auto object-contain" />
                    <p>No DATA</p>
                  </div>
                )}
              </React.Fragment>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const RenderATemplate = ({ templates }) => {
  return (
    <React.Fragment>
      {templates && templates.length > 0 && (
        <React.Fragment>
          <AnimatePresence>
            {templates &&
              templates.map((template, index) => (
                <TemplateDesignPin
                  key={template?._id}
                  data={template}
                  index={index}
                />
              ))}
          </AnimatePresence>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default UserProfile;
