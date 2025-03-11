import { useState,useEffect } from "react";
import axios from "axios";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart } from "recharts";

const colors =[
  "#90EE90", // Muy bajo (verde suave)
  "#ADFF2F", // Bajo (verde-amarillento)
  "#e5be01", // Medio (amarillo)
  "#FFA500", // Alto (naranja suave)
  "#FF0000"  // Muy alto (rojo intenso)
]
const riegos = [
  'Muy Bajo',
  'Bajo',
  'Medio',
  'Alto',
  'Muy Alto'
]
// const dataList = [
    // { title: "HighBP", labels: ["Sí", "No"], values: [{ name: "Sí", value: 65 }, { name: "No", value: 35 }] },
    // { title: "HighChol", labels: ["Sí", "No"], values: [{ name: "Sí", value: 55 }, { name: "No", value: 45 }] },
    // { title: "CholCheck", labels: ["Sí", "No"], values: [{ name: "Sí", value: 70 }, { name: "No", value: 30 }] },
    // { title: "BMI", labels: ["Sí", "No"], values: [{ name: "Sí", value: 90 }, { name: "No", value: 10 }] },
  
    // { title: "Smoker", labels: ["Rojo", "Azul", "Verde", "Amarillo", "Negro"], values: [{ name: "Rojo", value: 20 }, { name: "Azul", value: 25 }, { name: "Verde", value: 15 }, { name: "Amarillo", value: 30 }, { name: "Negro", value: 10 }] },
    // { title: "Stroke", labels: ["Pop", "Rock", "Jazz", "Reggaetón", "Clásica"], values: [{ name: "Pop", value: 30 }, { name: "Rock", value: 20 }, { name: "Jazz", value: 15 }, { name: "Reggaetón", value: 25 }, { name: "Clásica", value: 10 }] },
    // { title: "HeartDiseaseorAttack", labels: ["Fútbol", "Baloncesto", "Natación", "Tenis", "Otro"], values: [{ name: "Fútbol", value: 35 }, { name: "Baloncesto", value: 20 }, { name: "Natación", value: 15 }, { name: "Tenis", value: 20 }, { name: "Otro", value: 10 }] },
    // { title: "PhysActivity", labels: ["Acción", "Comedia", "Terror", "Drama", "Ciencia Ficción"], values: [{ name: "Acción", value: 25 }, { name: "Comedia", value: 30 }, { name: "Terror", value: 10 }, { name: "Drama", value: 20 }, { name: "Ciencia Ficción", value: 15 }] },
  
    // { title: "Fruits", labels: ["80-150"], values: [{ name: "Horas", value: 120 }] },
    // { title: "Veggies", labels: ["80-150"], values: [{ name: "BPM", value: 95 }] },
  
    // { title: "HvyAlcoholConsump", labels: ["Sí", "No"], values: [{ name: "Sí", value: 80 }, { name: "No", value: 20 }] },
    // { title: "AnyHealthcare", labels: ["Sí", "No"], values: [{ name: "Sí", value: 60 }, { name: "No", value: 40 }] },
    // { title: "NoDocbcCost", labels: ["Sí", "No"], values: [{ name: "Sí", value: 50 }, { name: "No", value: 50 }] },
    // { title: "GenHlth", labels: ["Sí", "No"], values: [{ name: "Sí", value: 85 }, { name: "No", value: 15 }] },
    // { title: "MentHlth", labels: ["Sí", "No"], values: [{ name: "Sí", value: 75 }, { name: "No", value: 25 }] },
    // { title: "PhysHlth", labels: ["Sí", "No"], values: [{ name: "Sí", value: 55 }, { name: "No", value: 45 }] },
    // { title: "DiffWalk", labels: ["Sí", "No"], values: [{ name: "Sí", value: 55 }, { name: "No", value: 45 }] },
    // { title: "Sex", labels: ["Sí", "No"], values: [{ name: "Sí", value: 55 }, { name: "No", value: 45 }] },
    // { title: "Age", labels: ["Sí", "No"], values: [{ name: "Sí", value: 55 }, { name: "No", value: 45 }] },
    // { title: "Education", labels: ["Sí", "No"], values: [{ name: "Sí", value: 55 }, { name: "No", value: 45 }] },
    // { title: "Income", labels: ["Sí", "No"], values: [{ name: "Sí", value: 55 }, { name: "No", value: 45 }] },
  // ];

  
  function Data(){
  useEffect(() => {
    axios.get("http://localhost:8000/descriptive_data") // Reemplaza con la URL real
      .then(response => {
        console.log("Lll",response.data)
        setDataList(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    return  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
    {dataList.map((item, index) => (
      <div key={index} className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
        <ResponsiveContainer width="100%" height={250}>
        <BarChart
          width={500}
          height={300}
          data={item.data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name_to_show" />
          <YAxis />
          <Tooltip />
          <Legend />
          {item.prediction_risks.map((option,index2)=>(
            <Bar dataKey={option} stackId="a" fill={colors[index2]} name={riegos[index2]} />
          )

          )}
          {/* <Bar dataKey="pv" stackId="a" fill="#8884d8" /> */}
        </BarChart>
        </ResponsiveContainer>
      </div>
    ))}
  </div>
}

export default Data;