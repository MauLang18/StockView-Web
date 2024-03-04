import React, { useState, useEffect } from "react";
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
import { useTokenStore } from "../tokenStore";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
  const [selectedValue, setSelectedValue] = useState("");

  const handleSearch = () => {
    // Manejar la búsqueda, por ejemplo, puedes imprimir el término en la consola
    console.log("Búsqueda:", searchTerm);

    // Ahora puedes usar setSearchTerm para actualizar el término de búsqueda
    // y pasar este término como prop a EnhancedTable
  };
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(selectedValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el token usando la función useTokenBearer
        const { bearerToken } = useTokenStore.getState();
        const url = `http://190.113.124.155:9099/Familias`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        const result = await response.json();
        setOptions(result.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedValue}
                    label="Age"
                    onChange={handleChange}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.codigo} value={option.codigo}>
                        {option.descripcion}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <EnhancedTable desc={searchTerm} priv={selectedValue} />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </div>
    </>
  );
}
