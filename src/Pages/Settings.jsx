import React from "react";
import Sidebar from "../Components/Sidebar";
import Box from "@mui/material/Box";
import Navbar from "../Components/Navbar";
import FolderList from "../Components/List";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "../Dash.css";

export default function Settings() {
  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <FolderList />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </div>
    </>
  );
}
