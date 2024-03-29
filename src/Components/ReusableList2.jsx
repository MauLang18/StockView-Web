import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function ReusableList2({ data }) {
  if (!Array.isArray(data)) {
    console.error("Los datos no son un array:", data);
    return null;
  }

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper", display: 'flex', flexWrap: 'wrap' }}>
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
              sx={{ flex: 1, paddingRight: "10px" }}
              primary={`Vendedor: ${item.vendedor}`}
              secondary={`Cantidad: ${item.cantidad}`}
            />
          </div>
        </ListItem>
      ))}
    </List>
  );
}
