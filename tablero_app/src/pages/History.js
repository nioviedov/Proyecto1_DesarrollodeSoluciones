import { useState,useEffect } from "react";
import axios from "axios";
import API_URL from "../environment"



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

  useEffect(() => {
    axios.get(`${API_URL}/predictions?user_id=${localStorage.getItem('username')}`) // Reemplaza con la URL real
      .then(response => {
        console.log("Lll",response.data)
        let data = response.data;
        data = data.map((elem,index)=>{
          elem.id = index;
          if(!elem.date){
            elem.date = '2025-03-11';
          }
          if(elem.date_time){
            elem.date = elem.date_time;
          }
          return elem;
        })
        setHistoricoData(data)
        console.log('>>>',data)
        // setDataList(response.data);
        setLoading(false);
        if(data.length > 0){
          setPrediction({
            prediction_percentage:data[0].prediction,})
          fillAnswer(data[0])
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const [prediction, setPrediction] = useState({
      prediction_percentage: null,
      // prediabetes_percentage: 0.5,
      // nodiabetes_percentage: 0.85,
    })
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [historicoData,setHistoricoData] =useState( [
      // {id:1, date: "2025-02-28", resultado: "Diabetes", link: "#",diabetes: .30, prediabetes: .40, nodiabetes: .30 },
      // {id:2, date: "2025-02-27", resultado: "Pre Diabetes", link: "#" ,diabetes: .50, prediabetes: .40, nodiabetes: .28},
      // {id:3, date: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .70, prediabetes: .45, nodiabetes: .27},
      // {id:4, date: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .80, prediabetes: .50, nodiabetes: .25},
      // {id:5, date: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .45, prediabetes: .55, nodiabetes: .22},
      // {id:6, date: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .40, prediabetes: .60, nodiabetes: .18},
      // {id:7, date: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .30, prediabetes: .70, nodiabetes: .14},
      // {id:8, date: "2025-02-26", resultado: "No diabetes", link: "#" ,diabetes: .32, prediabetes: .78, nodiabetes: .09},
    ]);
    const [answer,setAnswer] = useState({
      GenHlth:''
    })

    const fillAnswer = (data)=>{
      let res = {}
      const dicts_answers = {
        Sex:{0:'Hombre',1:'Mujer'},
        GenHlth:{1:'Excelente',2:'Muy bueno',3:'Bueno',4:'Regular',5:'Malo'},
        Age:{1:'Menos de 18 años',2:'18-24 años',3:'25-34 años',4:'35-44 años',5:'45 años o más'},
        Education:{1:'Sin estudios',2:'Educación primaria',3:'Educación secundaria',4:'Educación universitaria',5:'Postgrado'},
        Income:{1:'Menos de $500',2:'$500 - $1000',3:'$1000 - $2000',4:'$2000 - $5000',5:'Más de $5000'},
        HighBP:{0:'No',1:'Si'},
        HighChol:{0:'No',1:'Si'},
        CholCheck:{0:'No',1:'Si'},
        Smoker:{0:'No',1:'Si'},
        Stroke:{0:'No',1:'Si'},
        HearthDiseaseOrAttack:{0:'No',1:'Si'},
        PhysActivity:{0:'No',1:'Si'},
        Fruits:{0:'No',1:'Si'},
        Veggies:{0:'No',1:'Si'},
        HvyAlcoholConsump:{0:'No',1:'Si'},
        AnyHealthcare:{0:'No',1:'Si'},
        NoDocbcCost:{0:'No',1:'Si'},
        DiffWalk:{0:'No',1:'Si'},
      }
      for (let key in data) {
        console.log('key',key,dicts_answers[key],data[key])
        if(dicts_answers[key] && dicts_answers[key][data[key]] != undefined){
          res[key] = dicts_answers[key][data[key]]
        }
        // console.log(key, obj[key]); // a 1, b 2, c 3
    }
    res['Weight'] = data['Weight'];
    res['Height'] = data['Height'] * 100;
    res['PhysHlth'] = data['PhysHlth'];
    res['MentHlth'] = data['MentHlth'];

      setAnswer(res)
    }

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
        console.log("KKK",id,historicoData[i].prediction)
        setPrediction({
          prediction_percentage:historicoData[i].prediction,
          // prediabetes_percentage:historicoData[i].prediabetes,
          // nodiabetes_percentage:historicoData[i].nodiabetes,
        })
        fillAnswer(historicoData[i])
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
                    <td className="border p-2 text-center">{item.date}</td>
                    <td className="border p-2 text-center">{getNivelDeRiesgo(item.prediction)}</td>
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
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend 
      formatter={(value) => {
        const legendMap = {
          prediction: "Nivel de riesgo",
          prediabetes: "Prediabetes",
          nodiabetes: "No Diabetes"
        };
        return legendMap[value] || value;
      }}
    />
                <Line type="monotone" dataKey="prediction" stroke="#ff0000" />
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
          <div className={`${getClassName(prediction.prediction_percentage)} w-80 m-2 p-4`}>
          <span>{getNivelDeRiesgo(prediction.prediction_percentage)}</span>

          </div>
          <span className="m-4">{prediction.prediction_percentage * 100}%</span>
        </div>
        <div>
        <p><strong>Sexo</strong> {answer.Sex}</p>
        <p><strong>Peso (kg)</strong> {answer.Weight}</p>
        <p><strong>Altura (cm)</strong> {answer.Height}</p>
        <p><strong>Días en los que la salud física no
        fue buena en los últimos 30 díass</strong> {answer.PhysHlth}</p>
        <p><strong>Días en los que la salud mental no
        fue buena en los últimos 30 días</strong> {answer.MentHlth}</p>
        <p><strong>¿Cómo calificaría su estado general de salud?</strong> {answer.GenHlth}</p>
<p><strong>¿Cuál es su rango de edad?</strong> {answer.Age}</p>
<p><strong>¿Cuál es su nivel educativo más alto alcanzado?</strong> {answer.Education}</p>
<p><strong>¿Cuál es su nivel de ingresos mensuales?</strong> {answer.Income}</p>
<p><strong>¿Tiene presión arterial alta?</strong> {answer.HighBP}</p>
<p><strong>¿Tiene colesterol alto?</strong> {answer.HighChol}</p>
<p><strong>¿Se ha realizado un chequeo de colesterol en el último año?</strong> {answer.CholCheck}</p>
<p><strong>¿Fuma?</strong> {answer.Smoker}</p>
<p><strong>¿Ha sufrido un derrame cerebral?</strong> {answer.Stroke}</p>
<p><strong>¿Ha tenido una enfermedad cardíaca o ataque al corazón?</strong> {answer.HearthDiseaseOrAttack}</p>
<p><strong>¿Realiza actividad física regularmente?</strong> {answer.PhysActivity}</p>
<p><strong>¿Consume frutas diariamente?</strong> {answer.Fruits}</p>
<p><strong>¿Consume vegetales diariamente?</strong> {answer.Veggies}</p>
<p><strong>¿Consume alcohol en grandes cantidades?</strong> {answer.HvyAlcoholConsump}</p>
<p><strong>¿Tiene acceso a atención médica?</strong> {answer.AnyHealthcare}</p>
<p><strong>¿Ha evitado ir al médico por el costo?</strong> {answer.NoDocbcCost}</p>
<p><strong>¿Tiene dificultades para caminar?</strong> {answer.DiffWalk}</p>
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