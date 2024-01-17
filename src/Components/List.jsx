import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import HistoryIcon from "@mui/icons-material/History";
import { useFetch } from "../Hooks/useFetch";
import * as signalR from "@microsoft/signalr";
import { format } from "date-fns";

export default function FolderList() {
  const { data } = useFetch(`http://190.113.124.155:9092/Pedido`);

  const [signalRData, setSignalRData] = useState(null);

  useEffect(() => {
    if (data) {
      setSignalRData(data);
    }
  }, [data]);

  useEffect(() => {
    const connection1 = new signalR.HubConnectionBuilder()
      .withUrl("http://190.113.124.155:9092/hubPedido", {
        withCredentials: true,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    connection1.on("PedidoRegistrado", (banner) => {
      setSignalRData((prevData) => {
        if (!prevData || !prevData.data) {
          return { data: [banner] };
        }

        const updatedData = {
          ...prevData,
          data: [...prevData.data, banner],
        };

        return updatedData;
      });
    });

    connection1.on("PedidoActualizado", (banner) => {
      setSignalRData((prevData) => {
        if (!prevData || !prevData.data) {
          return { data: [] };
        }

        const updatedData = {
          ...prevData,
          data: prevData.data.map((item) =>
            item.id === banner.id ? banner : item
          ),
        };

        return updatedData;
      });
    });

    const startConnections = async () => {
      try {
        await connection1.start();
        console.log("Conexión 1 establecida con éxito");
      } catch (error) {
        console.error("Error al iniciar la conexión 1:", error);
      }
    };

    startConnections();

    return () => {
      connection1.stop();
    };
  }, []);

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
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {signalRData &&
        signalRData.data &&
        signalRData.data.map((item) => (
          <ListItem
            key={item.id}
            disableGutters
            sx={{
              borderBottom: "1px solid #ddd",
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <HistoryIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ paddingRight: "150px" }}
              primary={`Código: ${item.codigoArticulo}`}
              secondary={`Descripción: ${item.articulo}`}
            />
            <ListItemText
              sx={{ paddingRight: "150px" }}
              primary={`Código Cliente: ${item.codigoCliente}`}
              secondary={`Cliente: ${item.cliente}`}
            />
            <ListItemText
              sx={{ paddingRight: "150px" }}
              primary={`Vendedor: ${item.vendedor}`}
              secondary={`Cantidad: ${item.cantidad}`}
            />
            <ListItemText
              sx={{ paddingRight: "150px" }}
              primary={`Estado Pedido: `}
              secondary={getMessageByEstadoPedido(item.estadoPedido)}
            />
            <ListItemText
              sx={{ paddingRight: "150px" }}
              primary={`Fecha Pedido: `}
              secondary={format(new Date(item.fechaPedido), "dd-MM-yyyy")}
            />
            <ListItemText
              sx={{ paddingRight: "16px" }}
              primary={`Hora Pedido: `}
              secondary={format(new Date(item.fechaPedido), "hh:mm:ss")}
            />
          </ListItem>
        ))}
    </List>
  );
}
