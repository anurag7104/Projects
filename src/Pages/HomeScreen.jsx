import React, { Suspense } from "react";
import { Header, MainSpinner } from "../Components";
import Homecontainer from "../Containers/Homecontainer";
import { Route, Routes } from "react-router-dom";
import CreateTemplate from "./CreateTemplate";
import { CreateResume, TemplateDesignPinDetails, UserProfile } from "../Pages";

const HomeScreen = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/*Header*/}
      <Header />
      <main className="w-full ">
        <Suspense fallback={<MainSpinner />}>
          <Routes>
            <Route path="/" element={<Homecontainer />} />
            <Route path="/template/create" element={<CreateTemplate />} />
            <Route path="/profile/:uid" element={<UserProfile />} />
            <Route path="/resume/*" element={<CreateResume />} />
            <Route
              path="/resumeDetail/:templateID"
              element={<TemplateDesignPinDetails />}
            />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default HomeScreen;
