'use client'
import LeftArea from "./component/index/LeftArea";
import { Box, Stack } from "@mui/material";
import RightArea from "./component/index/RightArea";


export default function Home() {
  return (
    <Box>  
      <Stack direction="row" spacing="2" justifyContent="space-between">
         <LeftArea />
         <RightArea />
      </Stack>
    </Box>
  );
}
