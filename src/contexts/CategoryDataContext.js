import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";

const CategoryDataContext = createContext();
const SetCategoryDataContext = createContext();

export const useCategoryData = () => useContext(CategoryDataContext);
export const useSetCategoryData = () => useContext(SetCategoryDataContext);

export const CategoryDataProvider = ({ children }) => {
  const [CategoryData, setCategoryData] = useState({

    pageCategory: { results: [] },
    allCategory: { results: [] },
  });

  const currentUser = useCurrentUser();


  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });

      setCategoryData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

      setCategoryData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/category/?ordering=-private_screenshots_count"
        );
        setCategoryData((prevState) => ({
          ...prevState,
          allCategory: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <CategoryDataContext.Provider value={CategoryData}>
      <SetCategoryDataContext.Provider
        value={{ setCategoryData, handleFollow, handleUnfollow  }}
      >
        {children}
      </SetCategoryDataContext.Provider>
    </CategoryDataContext.Provider>
  );
};