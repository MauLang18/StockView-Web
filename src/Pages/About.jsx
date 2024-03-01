import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Box from "@mui/material/Box";
import Navbar from "../Components/Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "../Dash.css";
import EnhancedTable from "../Components/Datatable";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Select } from "@mui/base/Select";
import { Option } from "@mui/base/Option";
import UnstyledSelectForm from "../Components/UnstyledSelectForm";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function About() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Manejar la búsqueda, por ejemplo, puedes imprimir el término en la consola
    console.log("Búsqueda:", searchTerm);

    // Ahora puedes usar setSearchTerm para actualizar el término de búsqueda
    // y pasar este término como prop a EnhancedTable
  };

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
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                </Search>
                <UnstyledSelectForm />
                <EnhancedTable desc={searchTerm} />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </div>
    </>
  );
}
