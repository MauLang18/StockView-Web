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
    <List sx={{ display: 'flex', flexDirection: 'row', width: "100%", bgcolor: "background.paper" }}>
      {data.map((item) => (
        <ListItem
          key={item.id}
          disableGutters
          sx={{
            borderBottom: "1px solid #ddd",
            padding: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <ListItemText
              primary={`Cliente: ${item.cliente}`}
              secondary={`Código Cliente: ${item.codigoCliente}`}
            />
            <ListItemText
              primary={`Código: ${item.codigoArticulo}`}
              secondary={`Descripción: ${item.articulo}`}
            />
          </div>
          <div>
            <ListItemText
              primary={`Estado Pedido: `}
              secondary={getMessageByEstadoPedido(item.estadoPedido)}
            />
            <ListItemText
              primary={`Vendedor: ${item.vendedor}`}
              secondary={`Cantidad: ${item.cantidad}`}
            />
          </div>
          <SelectWithIconButton id={item.id} />
        </ListItem>
      ))}
    </List>
  );
}
