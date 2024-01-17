import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SelectWithIconButton from "./SelectWithIconButton";

export default function ReusableList({ data }) {
  if (!Array.isArray(data)) {
    console.error("Los datos no son un array:", data);
    return null;
  }

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
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {data.map((item) => (
        <ListItem
          key={item.id}
          disableGutters
          sx={{
            borderBottom: "1px solid #ddd",
            padding: "12px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ListItemText
            sx={{ flex: 1, paddingRight: "16px" }}
            primary={`Código: ${item.codigoArticulo}`}
            secondary={`Descripción: ${item.articulo}`}
          />
          <ListItemText
            sx={{ flex: 1, paddingRight: "16px" }}
            primary={`Código Cliente: ${item.codigoCliente}`}
            secondary={`Cliente: ${item.cliente}`}
          />
          <ListItemText
            sx={{ flex: 1, paddingRight: "16px" }}
            primary={`Vendedor: ${item.vendedor}`}
            secondary={`Cantidad: ${item.cantidad}`}
          />
          <ListItemText
            sx={{ flex: 1, paddingRight: "16px" }}
            primary={`Estado Pedido: `}
            secondary={getMessageByEstadoPedido(item.estadoPedido)}
          />
          <SelectWithIconButton id={item.id} />
        </ListItem>
      ))}
    </List>
  );
}
