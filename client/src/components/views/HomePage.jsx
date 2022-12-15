import { Box, useMediaQuery } from "@mui/material";
import React from 'react'
import UserWidget from "../scene/UserWidget"
import MyPostWidget from "../widgets/MyPostWidget"
import PostsWidget from "../widgets/PostWidget"
import { useSelector } from "react-redux";

import Navbar from './Navbar'
const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  

  return (
    <Box>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={"block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath}/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget />
        </Box>




          </Box>
       
      </Box>
  )
}

export default HomePage
