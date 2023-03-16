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
        value={{ setCategoryData }}
      >
        {children}
      </SetCategoryDataContext.Provider>
    </CategoryDataContext.Provider>
  );
};