import { useState } from "react";

function Predict() {
  // Estado para los inputs
  const [formData, setFormData] = useState({
    select_questions: [
      {
        question: 'GenHlth',
        text_question: '¿Cómo calificaría su estado general de salud?',
        options: [
          { option: '1', text_option: 'Excelente' },
          { option: '2', text_option: 'Muy bueno' },
          { option: '3', text_option: 'Bueno' },
          { option: '4', text_option: 'Regular' },
          { option: '5', text_option: 'Malo' }
        ],
        answer: ''
      },
      {
        question: 'Age',
        text_question: '¿Cuál es su rango de edad?',
        options: [
          { option: '1', text_option: 'Menos de 18 años' },
          { option: '2', text_option: '18-24 años' },
          { option: '3', text_option: '25-34 años' },
          { option: '4', text_option: '35-44 años' },
          { option: '5', text_option: '45 años o más' }
        ],
        answer: ''
      },
      {
        question: 'Education',
        text_question: '¿Cuál es su nivel educativo más alto alcanzado?',
        options: [
          { option: '1', text_option: 'Sin estudios' },
          { option: '2', text_option: 'Educación primaria' },
          { option: '3', text_option: 'Educación secundaria' },
          { option: '4', text_option: 'Educación universitaria' },
          { option: '5', text_option: 'Postgrado' }
        ],
        answer: ''
      },
      {
        question: 'Income',
        text_question: '¿Cuál es su nivel de ingresos mensuales?',
        options: [
          { option: '1', text_option: 'Menos de $500' },
          { option: '2', text_option: '$500 - $1000' },
          { option: '3', text_option: '$1000 - $2000' },
          { option: '4', text_option: '$2000 - $5000' },
          { option: '5', text_option: 'Más de $5000' }
        ],
        answer: ''
      }
    ],
    binary_questions: [
      { question: 'HighBP', text_question: '¿Tiene presión arterial alta?', answer: '', help_text: '' },
      { question: 'HighChol', text_question: '¿Tiene colesterol alto?', answer: '', help_text: '' },
      { question: 'CholCheck', text_question: '¿Se ha realizado un chequeo de colesterol en el último año?', answer: '', help_text: '' },
      { question: 'Smoker', text_question: '¿Fuma?', answer: '', help_text: '' },
      { question: 'Stroke', text_question: '¿Ha sufrido un derrame cerebral?', answer: '', help_text: '' },
      { question: 'HearthDiseaseOrAttack', text_question: '¿Ha tenido una enfermedad cardíaca o ataque al corazón?', answer: '', help_text: '' },
      { question: 'PhysActivity', text_question: '¿Realiza actividad física regularmente?', answer: '', help_text: '' },
      { question: 'Fruits', text_question: '¿Consume frutas diariamente?', answer: '', help_text: '' },
      { question: 'Veggies', text_question: '¿Consume vegetales diariamente?', answer: '', help_text: '' },
      { question: 'HvyAlcoholConsump', text_question: '¿Consume alcohol en grandes cantidades?', answer: '', help_text: '' },
      { question: 'AnyHealthcare', text_question: '¿Tiene acceso a atención médica?', answer: '', help_text: '' },
      { question: 'NoDocbcCost', text_question: '¿Ha evitado ir al médico por el costo?', answer: '', help_text: '' },
      { question: 'DiffWalk', text_question: '¿Tiene dificultades para caminar?', answer: '', help_text: '' }
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

  const getRecommendation = (percentage) => {
    if (percentage < 0.2) {
      return "Tu riesgo de diabetes es muy bajo. Mantén un estilo de vida saludable.";
    } else if (percentage < 0.4) {
      return "Tu riesgo de diabetes es bajo. Continúa con hábitos saludables y revisa tu estado de salud periódicamente.";
    } else if (percentage < 0.6) {
      return "Tu riesgo de diabetes es medio. Considera mejorar tu alimentación y aumentar la actividad física.";
    } else if (percentage < 0.8) {
      return "Tu riesgo de diabetes es alto. Es recomendable hacer chequeos médicos y mejorar tu estilo de vida.";
    } else {
      return "Tu riesgo de diabetes es muy alto. Consulta con un médico lo antes posible.";
    }
  };

  const handleChangeBinaryQuestion = (question, answer) => {

    setFormData((prev) => ({
      ...prev,
      binary_questions: prev.binary_questions.map((elem) =>
        elem.question === question ? { ...elem, answer } : elem
      ),
    }));
  }

  const getClassName = (percentage) => {
    console.log('dd', percentage)
    if (percentage < 0.3) {
      return 'bg-green-600'
    }
    else if (percentage < 0.8) {
      return 'bg-yellow-600'
    }
    else {
      return 'bg-red-600';
    }
  }

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



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-full grid grid-cols-2 gap-6">
        {/* Columna izquierda (formulario) - 50% del ancho */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-6">Formulario de Predicción</h2>
          <form className="grid grid-cols-3 gap-6" onSubmit={handleSubmit}>
            {/* Select 1 */}
            {formData.select_questions.map((question, index) => (

              <div>
                <label className="block text-gray-700">{question.text_question ? question.text_question : question.question}</label>
                <select
                  name={question.question}
                  value={formData.select1}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Seleccione...</option>
                  {question.options.map((option, index2) => (
                    <option value={option.option}>{option.text_option ? option.text_option : option.option}</option>
                  ))}
                  {/* <option value="opcion1">Opción 1</option>
                <option value="opcion2">Opción 2</option> */}
                </select>
              </div>
            ))}
            {formData.binary_questions.map((question, index) => (

              <div key={question.question} className="flex flex-col">
                <label className="font-medium">{question.text_question ? question.text_question : question.question}</label>
                {/* <label className="font-medium">{question.answer}</label> */}
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`question${index + 1}`}
                      value="si"
                      checked={question.answer === "si"}
                      onChange={() => { handleChangeBinaryQuestion(question.question, 'si') }}
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
                      onChange={() => { handleChangeBinaryQuestion(question.question, 'no') }}
                      className="w-4 h-4"
                    />
                    No
                  </label>
                </div>
              </div>
            ))}

            {/* Select 2 */}

            {/* Checkbox 1 */}

            {/* Checkbox 2 */}

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

                <span>{getNivelDeRiesgo(prediction.diabetes_percentage)}</span>
              </div>
              <span className="m-4">{prediction.diabetes_percentage * 100}%</span>
            </div>
            <div className="mt-4 p-4 bg-blue-100 border border-blue-500 text-blue-700 rounded-lg">
          <p>{getRecommendation(prediction.diabetes_percentage)}</p>
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
  );
}

export default Predict;
