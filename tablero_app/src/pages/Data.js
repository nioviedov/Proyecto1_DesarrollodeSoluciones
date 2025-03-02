import { useState } from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart } from "recharts";

const dataList = [
    { title: "HighBP", labels: ["Sí", "No"], values: [{ name: "Sí", value: 65 }, { name: "No", value: 35 }] },
    { title: "HighChol", labels: ["Sí", "No"], values: [{ name: "Sí", value: 55 }, { name: "No", value: 45 }] },
    { title: "CholCheck", labels: ["Sí", "No"], values: [{ name: "Sí", value: 70 }, { name: "No", value: 30 }] },
    { title: "BMI", labels: ["Sí", "No"], values: [{ name: "Sí", value: 90 }, { name: "No", value: 10 }] },
  
    { title: "Smoker", labels: ["Rojo", "Azul", "Verde", "Amarillo", "Negro"], values: [{ name: "Rojo", value: 20 }, { name: "Azul", value: 25 }, { name: "Verde", value: 15 }, { name: "Amarillo", value: 30 }, { name: "Negro", value: 10 }] },
    { title: "Stroke", labels: ["Pop", "Rock", "Jazz", "Reggaetón", "Clásica"], values: [{ name: "Pop", value: 30 }, { name: "Rock", value: 20 }, { name: "Jazz", value: 15 }, { name: "Reggaetón", value: 25 }, { name: "Clásica", value: 10 }] },
    { title: "HeartDiseaseorAttack", labels: ["Fútbol", "Baloncesto", "Natación", "Tenis", "Otro"], values: [{ name: "Fútbol", value: 35 }, { name: "Baloncesto", value: 20 }, { name: "Natación", value: 15 }, { name: "Tenis", value: 20 }, { name: "Otro", value: 10 }] },
    { title: "PhysActivity", labels: ["Acción", "Comedia", "Terror", "Drama", "Ciencia Ficción"], values: [{ name: "Acción", value: 25 }, { name: "Comedia", value: 30 }, { name: "Terror", value: 10 }, { name: "Drama", value: 20 }, { name: "Ciencia Ficción", value: 15 }] },
  
    { title: "Fruits", labels: ["80-150"], values: [{ name: "Horas", value: 120 }] },
    { title: "Veggies", labels: ["80-150"], values: [{ name: "BPM", value: 95 }] },
  
    { title: "HvyAlcoholConsump", labels: ["Sí", "No"], values: [{ name: "Sí", value: 80 }, { name: "No", value: 20 }] },
    { title: "AnyHealthcare", labels: ["Sí", "No"], values: [{ name: "Sí", value: 60 }, { name: "No", value: 40 }] },
    { title: "NoDocbcCost", labels: ["Sí", "No"], values: [{ name: "Sí", value: 50 }, { name: "No", value: 50 }] },
    { title: "GenHlth", labels: ["Sí", "No"], values: [{ name: "Sí", value: 85 }, { name: "No", value: 15 }] },
    { title: "MentHlth", labels: ["Sí", "No"], values: [{ name: "Sí", value: 75 }, { name: "No", value: 25 }] },
    { title: "PhysHlth", labels: ["Sí", "No"], values: [{ name: "Sí", value: 55 }, { name: "No", value: 45 }] },
    { title: "DiffWalk", labels: ["Sí", "No"], values: [{ name: "Sí", value: 55 }, { name: "No", value: 45 }] },
    { title: "Sex", labels: ["Sí", "No"], values: [{ name: "Sí", value: 55 }, { name: "No", value: 45 }] },
    { title: "Age", labels: ["Sí", "No"], values: [{ name: "Sí", value: 55 }, { name: "No", value: 45 }] },
    { title: "Education", labels: ["Sí", "No"], values: [{ name: "Sí", value: 55 }, { name: "No", value: 45 }] },
    { title: "Income", labels: ["Sí", "No"], values: [{ name: "Sí", value: 55 }, { name: "No", value: 45 }] },
  ];
function Data(){
    return  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
    {dataList.map((item, index) => (
      <div key={index} className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={item.values}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    ))}
  </div>
}

export default Data;