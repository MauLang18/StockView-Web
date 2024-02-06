import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import ReusableList from "../Components/ReusableList";
import ReusableList2 from "../Components/ReusableList2";
import Box from "@mui/material/Box";
import Navbar from "../Components/Navbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import "../Dash.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useFetch } from "../Hooks/useFetch";
import * as signalR from "@microsoft/signalr";

export default function Home() {
  const { data } = useFetch(`http://190.113.124.155:9096/Pedido`);

  const [signalRData, setSignalRData] = useState(null);

  useEffect(() => {
    if (data) {
      setSignalRData(data);
    }
  }, [data]);

  useEffect(() => {
    const connection1 = new signalR.HubConnectionBuilder()
      .withUrl("http://190.113.124.155:9096/hubPedido", {
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

  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Stack spacing={2} direction="row">
                  <Card
                    sx={{ minWidth: 49 + "%", height: 150 }}
                    className="gradient"
                  >
                    <CardContent>
                      <div className="iconstyle">
                        <CreditCardIcon />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "#ffffff" }}
                      >
                        {signalRData?.data?.filter(
                          (item) => item.estadoPedido === 0
                        ).length || 0}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "#ccd1d1" }}
                      >
                        Total ordenes en proceso
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{ minWidth: 49 + "%", height: 150 }}
                    className="gradientlight"
                  >
                    <CardContent>
                      <div className="iconstyle">
                        <ShoppingBagIcon />
                      </div>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ color: "#ffffff" }}
                      >
                        {signalRData?.data?.length || 0}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{ color: "#ccd1d1" }}
                      >
                        Total de ordenes
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Card className="gradientlight">
                    <Stack spacing={2} direction="row">
                      <div className="iconstyle">
                        <StorefrontIcon className="iconstyle" />
                      </div>
                      <div className="paddingall">
                        <span className="pricetitle">
                          {signalRData?.data?.filter(
                            (item) => item.estadoPedido === 1
                          ).length || 0}
                        </span>
                        <br />
                        <span className="pricesubtitle">
                          Total ordenes aprobadas
                        </span>
                      </div>
                    </Stack>
                  </Card>
                  <Card>
                    <Stack spacing={2} direction="row">
                      <div className="iconstyleblack">
                        <StorefrontIcon className="iconstyleblack" />
                      </div>
                      <div className="paddingall">
                        <span className="pricetitle">
                          {signalRData?.data?.filter(
                            (item) => item.estadoPedido === 2
                          ).length || 0}
                        </span>
                        <br />
                        <span className="pricesubtitle">
                          Total ordenes rechazadas
                        </span>
                      </div>
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Box height={20} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    {signalRData && signalRData.data && (
                      <ReusableList
                        data={signalRData.data
                          .reverse()
                          .filter((item) => item.estadoPedido === 0)}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <div className="paddingall">
                      <span className="pricetitle">Ultimos pedidos</span>
                    </div>
                    {signalRData && signalRData.data && (
                      <ReusableList2
                        data={signalRData.data.reverse().slice(0, 10)}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}
