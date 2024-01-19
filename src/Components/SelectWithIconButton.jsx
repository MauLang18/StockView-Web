import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectWithIconButton({ id }) {
  const [selectedValue, setSelectedValue] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);

    // Obtener el mensaje correspondiente al valor seleccionado
    setMessage(getMessageByEstadoPedido(selectedOption));

    // Enviar la actualización al servidor
    updateEstadoPedido(selectedOption);
  };

  const updateEstadoPedido = async (estadoPedido) => {
    const url = "http://190.113.124.155:9096/Pedido/Edit/Estado";
    const requestBody = {
      id: id,
      estadoPedido: estadoPedido,
    };

    try {
      const response = await fetch(url, {
        method: "PUT", // Puedes cambiar el método según la API que estás utilizando
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error("Error al actualizar el estado en el servidor");
        // Puedes manejar el error según tus necesidades
      } else {
        console.log("Estado actualizado exitosamente");
      }
    } catch (error) {
      console.error("Error de red:", error);
      // Puedes manejar el error de red según tus necesidades
    }
  };

  const getMessageByEstadoPedido = (estadoPedido) => {
    switch (estadoPedido) {
      case 0:
        return "Pedido en proceso";
      case 1:
        return "Pedido completado";
      case 2:
        return "Pedido no completado";
      default:
        return "Estado de pedido desconocido";
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label="Estado"
          onChange={handleChange}
        >
          <MenuItem value={0}>En proceso</MenuItem>
          <MenuItem value={1}>Completado</MenuItem>
          <MenuItem value={2}>No completado</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
