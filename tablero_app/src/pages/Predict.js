import { useState } from "react";

function Predict() {
  // Estado para los inputs
  const [formData, setFormData] = useState({
    binary_questions: [
      {question:'HighBP',text_question:'¿Tiene high BP?',answer:'',help_text:''},
      {question:'HighChol',answer:'',help_text:''},
      {question:'CholCheck,',answer:'',help_text:''},
      {question:'Smoker',answer:'',help_text:''},
    ],
    select1: "",
    select2: "",
    checkbox1: false,
    checkbox2: false,
  });

  const [prediction, setPrediction] = useState({
    diabetes_percentage: 0.2,
    prediabetes_percentage: 0.5,
    nodiabetes_percentage: 0.85,
  })
  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Manejo del submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };

  const handleChangeBinaryQuestion = (question,answer) =>{

    setFormData((prev) => ({
      ...prev,
      binary_questions: prev.binary_questions.map((elem) =>
        elem.question === question ? { ...elem, answer } : elem
      ),
    }));
  }

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



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl grid grid-cols-2 gap-6">
        {/* Columna izquierda (formulario) - 50% del ancho */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-6">Formulario de Predicción</h2>
          <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* Select 1 */}
            <div>
              <label className="block text-gray-700">Seleccione una opción 1</label>
              <select
                name="select1"
                value={formData.select1}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Seleccione...</option>
                <option value="opcion1">Opción 1</option>
                <option value="opcion2">Opción 2</option>
              </select>
            </div>
            {formData.binary_questions.map((question, index) => (

            <div key={question.question} className="flex flex-col">
            <label className="font-medium">{question.question}</label>
            {/* <label className="font-medium">{question.answer}</label> */}
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`question${index + 1}`}
                  value="si"
                  checked={question.answer === "si"}
                  onChange={()=>{handleChangeBinaryQuestion(question.question,'si')}}
                  className="w-4 h-4"
                />
                Sí
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`question${index + 1}`}
                  value="no"
                  checked={question.answer === "no"}
                  onChange={()=>{handleChangeBinaryQuestion(question.question,'no')}}
                  className="w-4 h-4"
                />
                No
              </label>
            </div>
          </div>
            ))}

            {/* Select 2 */}
            <div>
              <label className="block text-gray-700">Altura(cm)</label>
              <input type="number"></input>
              <label className="block text-gray-700">Peso(kg)</label>
              <input type="number"></input>
              {/* <select
                name="select2"
                value={formData.select2}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Seleccione...</option>
                <option value="opcionA">Opción A</option>
                <option value="opcionB">Opción B</option>
              </select> */}
            </div>

            {/* Checkbox 1 */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="checkbox1"
                checked={formData.checkbox1}
                onChange={handleChange}
                className="h-5 w-5 text-blue-500"
              />
              <label className="text-gray-700">Opción de verificación 1</label>
            </div>

            {/* Checkbox 2 */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="checkbox2"
                checked={formData.checkbox2}
                onChange={handleChange}
                className="h-5 w-5 text-blue-500"
              />
              <label className="text-gray-700">Opción de verificación 2</label>
            </div>

            {/* Botón de Enviar (ocupa 2 columnas) */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
              >
                Predecir
              </button>
            </div>
          </form>
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
  );
}

export default Predict;
