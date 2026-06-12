import React from "react";
import Container from "@mui/material/Container";
import { Box, Link, Paper, Stack, Typography, } from "@mui/material";
import Divider from '@mui/material/Divider';


function Footer() {
  return (
    <Box className="footer" sx={{ maxWidth: "none" ,fontSize:{xs:"0.8rem"}}}>
              <Divider style={{width:'100%'}}></Divider>

      <Container sx={{display:"flex",justifyContent:"center"}}>
        <Typography  m={"1rem"}
                    variant="p"
            color="default"
            fontWeight={"800"}
            textAlign={"center"}

        
        >
          Designed and developed by
          <Link
            href="https://github.com/ayman3340"
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
            
          >
           <span></span> Ayman Kamal
          </Link>
        </Typography>
        <Typography m={"1rem"}
                    variant="p"
            color="default"
            fontWeight={"800"}
            textAlign={"center"} >
          Powered by
          <Link
            href="https://developers.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
           <span></span> The Movie Database API
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
