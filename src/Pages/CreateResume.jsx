import React from "react";
import { Route, Routes } from "react-router-dom";
import { TemplatesData } from "../utils/helper";

const CreateResume = () => {
  return (
    <div className="w-full flex flex-col items-center justify-start">
      <Routes>
        {TemplatesData.map((template) => (
          <Route
            key={template?.id}
            path={`/${template?.name}`}
            element={<template.component />}
          />
        ))}
      </Routes>
    </div>
  );
};

export default CreateResume;
