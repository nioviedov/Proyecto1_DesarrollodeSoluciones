import { useState } from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function History() {

  const [prediction, setPrediction] = useState({
      diabetes_percentage: 0.2,
      prediabetes_percentage: 0.5,
      nodiabetes_percentage: 0.85,
    })

    const [historicoData,setHistoricoData] =useState( [
      {id:1, fecha: "2025-02-28", resultado: "Diabetes", link: "#",diabetes: .30, prediabetes: .40, nodiabetes: .30 },
      {id:2, fecha: "2025-02-27", resultado: "Pre Diabetes", link: "#" ,diabetes: .30, prediabetes: .40, nodiabetes: .28},
      {id:3, fecha: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .30, prediabetes: .45, nodiabetes: .27},
      {id:4, fecha: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .30, prediabetes: .50, nodiabetes: .25},
      {id:5, fecha: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .30, prediabetes: .55, nodiabetes: .22},
      {id:6, fecha: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .30, prediabetes: .60, nodiabetes: .18},
      {id:7, fecha: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .30, prediabetes: .70, nodiabetes: .14},
      {id:8, fecha: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .30, prediabetes: .78, nodiabetes: .09},
    ]);

  const getClassName = (percentage) => {
    console.log('dd',percentage)
    if (percentage < 0.3) {
      return 'bg-red-600';
    }
    else if (percentage < 0.8) {
      return 'bg-yellow-600'
    }
    else {
      return 'bg-green-600'
    }
  }

  const setPredictionItem=(id)=>{
    for(let i=0;i<historicoData.length;i++){
      if(historicoData[i].id == id){

        setPrediction({
          diabetes_percentage:historicoData[i].diabetes,
          prediabetes_percentage:historicoData[i].prediabetes,
          nodiabetes_percentage:historicoData[i].nodiabetes,
        })
      }
    }
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl grid grid-cols-2 gap-6">
    {/* Columna izquierda (formulario) - 50% del ancho */}
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Hisotrico</h2>
      <div className="overflow-y-auto max-h-60">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Fecha</th>
                  <th className="border p-2">Resultado</th>
                  <th className="border p-2">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {historicoData.map((item, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2 text-center">{item.fecha}</td>
                    <td className="border p-2 text-center">{item.resultado}</td>
                    <td className="border p-2 text-center">
                      <a onClick={()=>{setPredictionItem(item.id)}}  href={item.link} className="text-blue-500 hover:underline">
                        Ver detalle
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Evolución de Variables</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="diabetes" stroke="#ff0000" />
                <Line type="monotone" dataKey="prediabetes" stroke="#ffcc00" />
                <Line type="monotone" dataKey="nodiabetes" stroke="#00cc00" />
              </LineChart>
            </ResponsiveContainer>
          </div>
    </div>

    {/* Columna derecha (resultados) - 50% del ancho */}
    <div className="bg-gray-200 p-6 rounded-lg shadow flex items-between justify-between">
      <div className="flex flex-col w-full ">
        <div className="flex flex-row justify-between w-full">
          <div className={`${getClassName(prediction.diabetes_percentage)} w-80 m-2 p-4`}>

            <span>Diabetes</span>
          </div>
          <span className="m-4">{prediction.diabetes_percentage * 100}%</span>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className={`${getClassName(prediction.prediabetes_percentage)} w-80 m-2 p-4`}>
            <span>Pre Diabetes</span>
          </div>
          <span className="m-4">{prediction.prediabetes_percentage * 100}%</span>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className={`${getClassName(prediction.nodiabetes_percentage)} w-80 m-2 p-4`}>
            <span>No diabetes</span>
          </div>
          <span className="m-4">{prediction.nodiabetes_percentage * 100}%</span>
        </div>
      </div>
    </div>
  </div>
</div>
  )
  }
  
  export default History;