import { useState } from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const getNivelDeRiesgo = (percentage) =>{
  if(percentage < .20){
    return 'Muy bajo'
  }
  else if(percentage < .40){
    return 'Bajo'
  }
  else if(percentage < .60){
    return 'Medio'
  }
  else if(percentage < .80){
    return 'Alto'
  }
  else{
    return 'Muy Alto'
  }
}


function History() {

  const [prediction, setPrediction] = useState({
      diabetes_percentage: 0.3,
      prediabetes_percentage: 0.5,
      nodiabetes_percentage: 0.85,
    })

    const [historicoData,setHistoricoData] =useState( [
      {id:1, fecha: "2025-02-28", resultado: "Diabetes", link: "#",diabetes: .30, prediabetes: .40, nodiabetes: .30 },
      {id:2, fecha: "2025-02-27", resultado: "Pre Diabetes", link: "#" ,diabetes: .50, prediabetes: .40, nodiabetes: .28},
      {id:3, fecha: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .70, prediabetes: .45, nodiabetes: .27},
      {id:4, fecha: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .80, prediabetes: .50, nodiabetes: .25},
      {id:5, fecha: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .45, prediabetes: .55, nodiabetes: .22},
      {id:6, fecha: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .40, prediabetes: .60, nodiabetes: .18},
      {id:7, fecha: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .30, prediabetes: .70, nodiabetes: .14},
      {id:8, fecha: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .32, prediabetes: .78, nodiabetes: .09},
    ]);

    const getClassName = (percentage) => {
      console.log('dd', percentage)
      if (percentage < 0.4) {
        return 'bg-green-600'
      }
      else if (percentage < 0.6) {
        return 'bg-yellow-600'
      }
      else {
        return 'bg-red-600';
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
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-full grid grid-cols-2 gap-6">
    {/* Columna izquierda (formulario) - 50% del ancho */}
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Historico de Predicciones</h2>
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
                    <td className="border p-2 text-center">{getNivelDeRiesgo(item.diabetes)}</td>
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
            <h2 className="text-xl font-semibold mb-4">Evolución del nivel del riesgo</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Legend 
      formatter={(value) => {
        const legendMap = {
          diabetes: "Nivel de riesgo",
          prediabetes: "Prediabetes",
          nodiabetes: "No Diabetes"
        };
        return legendMap[value] || value;
      }}
    />
                <Line type="monotone" dataKey="diabetes" stroke="#ff0000" />
                {/* <Line type="monotone" dataKey="prediabetes" stroke="#ffcc00" />
                <Line type="monotone" dataKey="nodiabetes" stroke="#00cc00" /> */}
              </LineChart>
            </ResponsiveContainer>
          </div>
    </div>

    {/* Columna derecha (resultados) - 50% del ancho */}
    <div className="bg-gray-200 p-6 rounded-lg shadow flex items-between justify-between">
      <div className="flex flex-col w-full ">
        <div className="flex flex-row justify-between w-full">
          <div className={`${getClassName(prediction.diabetes_percentage)} w-80 m-2 p-4`}>
          <span>{getNivelDeRiesgo(prediction.diabetes_percentage)}</span>

          </div>
          <span className="m-4">{prediction.diabetes_percentage * 100}%</span>
        </div>
        <div>
        <p><strong>¿Cómo calificaría su estado general de salud?</strong> Muy bueno</p>
<p><strong>¿Cuál es su rango de edad?</strong> 25-34 años</p>
<p><strong>¿Cuál es su nivel educativo más alto alcanzado?</strong> Educación universitaria</p>
<p><strong>¿Cuál es su nivel de ingresos mensuales?</strong> $1000 - $2000</p>
<p><strong>¿Tiene presión arterial alta?</strong> No</p>
<p><strong>¿Tiene colesterol alto?</strong> Sí</p>
<p><strong>¿Se ha realizado un chequeo de colesterol en el último año?</strong> Sí</p>
<p><strong>¿Fuma?</strong> No</p>
<p><strong>¿Ha sufrido un derrame cerebral?</strong> No</p>
<p><strong>¿Ha tenido una enfermedad cardíaca o ataque al corazón?</strong> No</p>
<p><strong>¿Realiza actividad física regularmente?</strong> Sí</p>
<p><strong>¿Consume frutas diariamente?</strong> Sí</p>
<p><strong>¿Consume vegetales diariamente?</strong> Sí</p>
<p><strong>¿Consume alcohol en grandes cantidades?</strong> No</p>
<p><strong>¿Tiene acceso a atención médica?</strong> Sí</p>
<p><strong>¿Ha evitado ir al médico por el costo?</strong> No</p>
<p><strong>¿Tiene dificultades para caminar?</strong> No</p>
        </div>
        {/* <div className="flex flex-row justify-between w-full">
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
        </div> */}
      </div>
    </div>
  </div>
</div>
  )
  }
  
  export default History;