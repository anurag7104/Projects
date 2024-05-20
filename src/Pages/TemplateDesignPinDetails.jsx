import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  getTemplateDetails,
  saveToCollections,
  saveToFavourites,
} from "../Api";
import { MainSpinner, TemplateDesignPin } from "../Components";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  BiFolderPlus,
  BiHeart,
  BiSolidFolderPlus,
  BiSolidHeart,
} from "react-icons/bi";
import useUser from "../hooks/useUser";
import useTemplates from "../hooks/useTemplates";
import { AnimatePresence } from "framer-motion";

const TemplateDesignPinDetails = () => {
  const { templateID } = useParams();

  const { data, isError, isLoading, refetch } = useQuery(
    ["template", templateID],
    () => getTemplateDetails(templateID)
  );

  const { data: user, refetch: userRefetch } = useUser();

  const {
    data: templates,
    refetch: temp_refetch,
    isLoading: temp_isLoading,
  } = useTemplates();
  const addToCollection = async (e) => {
    e.stopPropagation();
    await saveToCollections(user, data);
    userRefetch();
  };
  const addToFavourites = async (e) => {
    e.stopPropagation();
    await saveToFavourites(user, data);
    temp_refetch();
    refetch();
  };

  if (isLoading) return <MainSpinner />;

  if (isError) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <p className=" text-lg text-textPrimary font-semibold">
          Error while fetching the dtaa...... Please Try again later
        </p>
      </div>
    );
  }

  return (
    <div className=" w-full flex items-center justify-start flex-col px-4 py-12">
      {/*  bread cramp  */}
      <div className=" w-full flex items-center pb-8  gap-2">
        <Link
          to={"/"}
          className=" flex  items-center justify-center gap-2 text-textPrimary"
        >
          <FaHouse />
          Home
        </Link>
        <p>/</p>
        <p>{data?.name}</p>
      </div>

      {/*  Main Section  */}
      <div className=" w-full grid grid-cols-1 lg:grid-cols-12">
        {/*  left Section  */}
        <div className=" col-span-1 lg:col-span-8 flex flex-col items-start justify-start gap-4">
          {/*  Load the Template Design  */}
          <img
            className="w-full h-auto object-contain rounded-md"
            src={data?.imageURL}
          />

          {/* Title and other options */}
          <div className=" w-full flex flex-col items-start justify-start gap-2">
            {/* Title Section */}

            <div className=" w-full flex items-center justify-between">
              {/* Title*/}
              <p className=" text-base text-textPrimary font-semibold">
                {data?.title}
              </p>
              {/* Likes*/}

              {data?.favourites?.length > 0 && (
                <div className=" flex items-center justify-center gap-1">
                  <BiSolidHeart className="text-base text-red-500" />
                  <p className=" text-base text-textPrimary font-semibold">
                    {data?.favourites?.length} Likes
                  </p>
                </div>
              )}
            </div>

            {/* Collection and fav options*/}
            {user && (
              <div className="flex items-center justify-center gap-3">
                {user?.collections?.includes(data?._id) ? (
                  <React.Fragment>
                    <div
                      onClick={addToCollection}
                      className=" flex items-center justify-center px-4 rounded-md border
                 border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <BiSolidFolderPlus className=" text-base text-textPrimary" />
                      <p className=" text-sm text-textPrimary whitespace-nowrap">
                        Remove Fromm Collections
                      </p>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div
                      onClick={addToFavourites}
                      className=" flex items-center justify-center px-4 rounded-md border
                 border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <BiFolderPlus className=" text-base text-textPrimary" />
                      <p className=" text-sm text-textPrimary whitespace-nowrap">
                        Add to Collections
                      </p>
                    </div>
                  </React.Fragment>
                )}

                {data?.favourites?.includes(user?.uid) ? (
                  <React.Fragment>
                    <div
                      onClick={addToCollection}
                      className=" flex items-center justify-center px-4 rounded-md border
                 border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <BiSolidHeart className=" text-base text-textPrimary" />
                      <p className=" text-sm text-textPrimary whitespace-nowrap">
                        Remove Fromm Favourites
                      </p>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div
                      onClick={addToCollection}
                      className=" flex items-center justify-center px-4 rounded-md border
                 border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <BiHeart className=" text-base text-textPrimary" />
                      <p className=" text-sm text-textPrimary whitespace-nowrap">
                        Add to Favourites
                      </p>
                    </div>
                  </React.Fragment>
                )}
              </div>
            )}
          </div>
        </div>
        {/*  Right Section  */}
        <div className=" col-span-1  lg:col-span-4 w-full flex flex-col items-center justify-start px-3 gap-6 ">
          {/*  Discover More  */}

          <div
            className=" w-full h-72 bg-blue-200 rounded-md overflow-hidden relative "
            style={{
              background:
                "https://media.istockphoto.com/id/1324380506/photo/people-with-vr-grasses-playing-virtual-reality-game-future-digital-technology-and-3d-virtual.jpg?s=1024x1024&w=is&k=20&c=tKCs5DtocXSosJuTlxiFE-qOIBoJW1uLcitzWwtdBsw=",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className=" absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
              <Link
                to={"/"}
                className=" px-4 py-2 rounded-md border-2 border-gray-50 text-white"
              >
                Discover More
              </Link>
            </div>
          </div>
          {console.log(data?.name)}

          {/*  Edit the template  */}
          {user && (
            
            <Link
              className=" w-full px-4 py-3 rounded-md flex items-center justify-center bg-emerald-500 "
              to={`/resume/${data?.name}?templateId=${templateID}`}
            >
              <p className=" text-white font-semibold text-lg">
                Edit This Template
              </p>
            </Link>
          )}

          {console.log(data)}
          {/*  Tags  */}
          <div className="w-full flex items-center justify-start flex-wrap">
            {data?.tags ? (
              data.tags.map((tag, index) => (
                <p
                  className="text-xs border border-gray-300 px-2 py-1 rounded-md whitespace-nowrap"
                  key={index}
                >
                  {tag}
                </p>
              ))
            ) : (
              <p>No tags available</p>
            )}
          </div>
        </div>
      </div>

      {/* Similar Templates */}
      {templates?.filter((temp) => temp._id !== data?._id)?.length > 0 && (
        <div className=" w-full py-8 flex flex-col items-start justify-start gap-4">
          <p className=" text-lg font-semibold text-txtDark">
            {" "}
            You Might also like
          </p>
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 ">
            <React.Fragment>
              <AnimatePresence>
                {templates
                  ?.filter((temp) => temp._id !== data?._id)
                  .map((template, index) => (
                    <TemplateDesignPin
                      key={template?._id}
                      data={template}
                      index={index}
                    />
                  ))}
              </AnimatePresence>
            </React.Fragment>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateDesignPinDetails;
