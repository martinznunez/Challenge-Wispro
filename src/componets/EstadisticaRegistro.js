import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const EstadisticaLogueos = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let cantidadRegistro = [];

    let days = [];
    axios
      .get("http://localhost:5000/data")
      .then((res) => {
        for (const dataObj of res.data) {
          cantidadRegistro.push(parseInt(dataObj.cantidadRegistro));
          days.push(parseInt(dataObj.dia));
        }

        setChartData({
          labels: days,
          datasets: [
            {
              label: "Cantidad de Registros",
              data: cantidadRegistro,
              backgroundColor: ["rgb(128, 128, 128)"],
              borderWidth: 2,
              pointBorderColor: "#fff",
              borderColor: "#a7281a",
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="container-graficos">
      <h1>Registros</h1>
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default EstadisticaLogueos;
