import React, { useState, useEffect } from "react";
import { useTokenStore } from "../tokenStore";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function UnstyledSelectForm() {
  const [selectedValue, setSelectedValue] = useState("");
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
  );
}
