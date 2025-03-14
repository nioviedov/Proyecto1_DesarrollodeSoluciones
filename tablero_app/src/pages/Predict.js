import { useState,useEffect } from "react";
import axios from "axios";
import API_URL from "../environment"
import { getNivelDeRiesgo } from "../utils";


function Predict() {
  // Estado para los inputs
  useEffect(() => {
    // fillQuestionsCase3()
    
  }, []); // Se ejecuta solo una vez al montar el componente
  
  const fillQuestionsCase1 = ()=>{
    setFormData((prev) => ({
      ...prev,
      sex:{...prev.sex,answer:'1'},
      weight:{...prev.weight,answer:'85'},
      height:{...prev.height,answer:'175'},
      mentHlth:{...prev.mentHlth,answer:'0'},
      physHlth:{...prev.physHlth,answer:'0'},
      select_questions:prev.select_questions.map((elem,index) =>{
        if(index == 0){
          return {...elem,answer:'3'}
        }
        if(index == 1){
          return {...elem,answer:'11'}
        }
        if(index == 2){
          return {...elem,answer:'5'}
        }
        else{
          return {...elem,answer:'7'}
        }
      }
    ),
      binary_questions: prev.binary_questions.map((elem,index) =>{
        if(index == 0 || index == 1 || index==2 || index  == 3 || index == 6 || index == 7 || index == 10){
          
          return {...elem,answer:'si'}
        }
        else{
          return {...elem,answer:'no'}

        }
      }
        
         
      ),
    }));
    
  }
  const fillQuestionsCase2 = ()=>{
    setFormData((prev) => ({
      ...prev,
      sex:{...prev.sex,answer:'1'},
      weight:{...prev.weight,answer:'68'},
      height:{...prev.height,answer:'175'},
      mentHlth:{...prev.mentHlth,answer:'0'},
      physHlth:{...prev.physHlth,answer:'0'},
      select_questions:prev.select_questions.map((elem,index) =>{
        if(index == 0){
          return {...elem,answer:'1'}
        }
        if(index == 1){
          return {...elem,answer:'11'}
        }
        if(index == 2){
          return {...elem,answer:'5'}
        }
        else{
          return {...elem,answer:'7'}
        }
      }
    ),
      binary_questions: prev.binary_questions.map((elem,index) =>{
        if(index == 0 || index == 1 || index==2 || index  == 3  || index==6  || index == 7  || index == 8 || index == 10){
          
          return {...elem,answer:'si'}
        }
        else{
          return {...elem,answer:'no'}

        }
      }
        
         
      ),
    }));
    
  }

  const fillQuestionsCase3 = ()=>{
    setFormData((prev) => ({
      ...prev,
      sex:{...prev.sex,answer:'1'},
      weight:{...prev.weight,answer:'70'},
      height:{...prev.height,answer:'170'},
      mentHlth:{...prev.mentHlth,answer:'0'},
      physHlth:{...prev.physHlth,answer:'0'},
      select_questions:prev.select_questions.map((elem,index) =>{
        if(index == 0){
          return {...elem,answer:'2'}
        }
        if(index == 1){
          return {...elem,answer:'4'}
        }
        if(index == 2){
          return {...elem,answer:'6'}
        }
        else{
          return {...elem,answer:'8'}
        }
      }
    ),
      binary_questions: prev.binary_questions.map((elem,index) =>{
        if( index==2  || index==6  || index == 7  || index == 8 || index == 10){
          
          return {...elem,answer:'si'}
        }
        else{
          return {...elem,answer:'no'}

        }
      }
        
         
      ),
    }));
    
  }

  const [formData, setFormData] = useState({
    sex:{
      question:'Sex',
      text_question:'Sexo',
      answer:''
    },
    weight:{
      question:'Weight',
      text_question:'Peso',
      answer:''
    },
    height:{
      question:'Height',
      text_question:'Altura',
      answer:''
    },
    mentHlth:{
      question:'MentHlth',
      text_question:'mentHlth',
      answer:''
    },
    physHlth:{
      question:'PhysHlth',
      text_question:'physHlth',
      answer:''
    },
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
          { option: '1', text_option: '18-24 años' },
          { option: '2', text_option: '25-29 años' },
          { option: '3', text_option: '30-34 años' },
          { option: '4', text_option: '35-39 años' },
          { option: '5', text_option: '40-44 años' },
          { option: '6', text_option: '45-49 años' },
          { option: '7', text_option: '50-54 años' },
          { option: '8', text_option: '55-59 años' },
          { option: '9', text_option: '60-64 años' },
          { option: '10', text_option: '65-69 años' },
          { option: '11', text_option: '70-74 años' },
          { option: '12', text_option: '75-79 años' },
          { option: '13', text_option: '80+ años' }
        ],
        answer: ''
      },
      {
        question: 'Education',
        text_question: '¿Cuál es su nivel educativo más alto alcanzado?',
        options:[
          { option: '1', text_option: 'Nunca asistió a la escuela o solo kindergarten' },
          { option: '2', text_option: 'Grados 1-8 (Primaria incompleta)' },
          { option: '3', text_option: 'Grados 9-11 (Secundaria incompleta)' },
          { option: '4', text_option: 'Graduado de Secundaria (o equivalente, como GED)' },
          { option: '5', text_option: 'Alguna educación universitaria o técnica (sin título)' },
          { option: '6', text_option: 'Graduado universitario (Licenciatura o superior)' }
        ],
        answer: ''
      },
      {
        question: 'Income',
        text_question: '¿Cuál es su nivel de ingresos mensuales?',
        options: [
          { option: '1', text_option: 'Menos de $10,000' },
  { option: '2', text_option: '$10,000 - $14,999' },
  { option: '3', text_option: '$15,000 - $19,999' },
  { option: '4', text_option: '$20,000 - $24,999' },
  { option: '5', text_option: '$25,000 - $34,999' },
  { option: '6', text_option: '$35,000 - $49,999' },
  { option: '7', text_option: '$50,000 - $74,999' },
  { option: '8', text_option: '$75,000 o más' }
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
    
  })
  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    console.log('lloo',e.target)
    const { name, value, type, checked } = e.target;
    console.log({ name, value, type, checked })
    // setFormData((prev) => ({
    //   ...prev,
    //   [name]: type === "checkbox" ? checked : value,
    // }));
    setFormData((prev) => ({
      ...prev,
      select_questions: prev.select_questions.map((elem) =>
        elem.question === name ? { ...elem, answer:value } : elem
      ),
    }));
  };

  // Manejo del submit

  const getData = ()=>{
    console.log('iii')
    let res = {}
    const dict_bin_questions = {'si':1,'no':0}
    for(let i = 0;i<formData.binary_questions.length;i++){
      console.log('LL99')
      res[formData.binary_questions[i].question] = dict_bin_questions[formData.binary_questions[i].answer];
    }
    console.log('ll',formData.select_questions.length)
    for(let i=0;i<formData.select_questions.length;i++){
      console.log('AAAUU',i)
     res[formData.select_questions[i].question] = formData.select_questions[i].answer
    }
    res['Sex'] = formData.sex.answer;
    res['Weight'] = formData.weight.answer;
    res['Height'] = (parseInt( formData.height.answer)/100.0).toString();
    res['PhysHlth'] = formData.physHlth.answer;
    res['MentHlth'] = formData.mentHlth.answer;
    return res;
  }

  const valid_form = () =>{
    let valid = true;
    let res = {}
    const dict_bin_questions = {'si':1,'no':0}
    for(let i = 0;i<formData.binary_questions.length;i++){
      if(formData.binary_questions[i].answer == ''){
        return false
      }
    }
    console.log('ll',formData.select_questions.length)
    for(let i=0;i<formData.select_questions.length;i++){
     if(formData.select_questions[i].answer == ''){
      return false
     }
    }
    //TOFO FALTA
    if(formData.sex.answer == ""){
      return false
    }
    if(formData.weight.answer == ""){
      return false
    }
    if(formData.height.answer == ""){
      return false
    }
    if(formData.physHlth.answer == ""){
      return false
    }
    if(formData.mentHlth.answer == ""){
      return false
    }
    return valid;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    if(!valid_form()){
      window.alert("Debes llenar todos los campos del formulario")
      return
    }
    let data = getData()
    axios.post(`${API_URL}/save_prediction?user_id=${localStorage.getItem('username')}`,data).then(res=>{
      console.log(res.data)
      setPrediction({diabetes_percentage:res.data.prediction.prediction})
      console.log('kkk',prediction)
    }).catch(err=>{
      console.log('ERROR',err)
    })
  };

  const ClearQuestions = ()=>{
    setPrediction({})
    setFormData((prev) => ({
      ...prev,
      sex:{...prev.sex,answer:''},
      weight:{...prev.weight,answer:''},
      height:{...prev.height,answer:''},
      mentHlth:{...prev.mentHlth,answer:''},
      physHlth:{...prev.physHlth,answer:''},
      select_questions:prev.select_questions.map((elem) =>
      ({...elem,answer:''})
    ),
      binary_questions: prev.binary_questions.map((elem) =>
         ({ ...elem, answer:'' })
      ),
    }));
  }

  const getRecommendation = (percentage) => {
    let dict = {
      1:'Tu riesgo de diabetes es muy bajo. Mantén un estilo de vida saludable',
      2:'Tu riesgo de diabetes es bajo. Continúa con hábitos saludables y revisa tu estado de salud periódicamente.',
      3:'Tu riesgo de diabetes es medio. Considera mejorar tu alimentación y aumentar la actividad física',
      4:'Tu riesgo de diabetes es alto. Es recomendable hacer chequeos médicos y mejorar tu estilo de vida.',
      5:'Tu riesgo de diabetes es muy alto. Consulta con un médico lo antes posible.'
    }
    return dict[getNivelDeRiesgo(percentage)]
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
  const handleChangeSex = (answer)=>{
    setFormData((prev)=>({
      ...prev,
      sex:{...prev.sex,answer:answer}
    }))
  }

  const handleChangeInput = (field,answer) =>{
    setFormData((prev)=>({
      ...prev,
      [field]:{...prev[field],answer:answer}
    }))
  }

  const getClassName = (percentage) => {
    let level = getNivelDeRiesgo(percentage) // TODO CAMBIAR COLORES
    return `bg-level_risk_${level}`
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

  const getNivelDeRiesgoTitle = (percentage) =>{
    let level = getNivelDeRiesgo(percentage)
    const dict_ = {1:'Muy Bajo',2:'Bajo',3:'Medio',4:'Alto',5:'Muy Alto'}
    return dict_[level];
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-full grid grid-cols-2 gap-6">
        {/* Columna izquierda (formulario) - 50% del ancho */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-6">Formulario de Predicción</h2>
          <form className="grid grid-cols-3 gap-6" onSubmit={handleSubmit}>

{/* Sex */}
          <div className="flex flex-col">
                <label className="font-medium">Sexo</label>
                {/* <label className="font-medium">{question.answer}</label> */}
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`Sex`}
                      value="si"
                      checked={formData.sex.answer === "0"}
                      onChange={() => { handleChangeSex( '0') }}
                      className="w-4 h-4"
                    />
                    Mujer
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`Sex`}
                      value="no"
                      checked={formData.sex.answer === "1"}
                      onChange={() => { handleChangeSex( '1') }}
                      className="w-4 h-4"
                    />
                    Hombre
                  </label>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Peso(kg)</label>
                <input type="number" onChange={(e)=>handleChangeInput('weight',e.target.value)} value={formData.weight.answer}  />
                </div>
                <div className="flex flex-col">
                <label className="font-medium">Altura(cm)</label>
                <input type="number" onChange={(e)=>handleChangeInput('height',e.target.value)} value={formData.height.answer}  />
                </div>
                {/* mentHlth:{...prev.mentHlth,answer:'1'},
                physHlth:{...prev.physHlth,answer:'1'}, 
                 max={30} min={0} step={1}*/}
                <div>
                <label className="font-medium">Días en los que la salud física no
                fue buena en los últimos 30 días</label>
                <input type="number" max={30} min={0} step={1} onChange={(e)=>handleChangeInput('physHlth',e.target.value)} value={formData.physHlth.answer}  />
                </div>
                <div className="flex flex-col">
                <label className="font-medium">Días en los que la salud mental no
                fue buena en los últimos 30 días</label>
                <input type="number" max={30} min={0} step={1} onChange={(e)=>handleChangeInput('mentHlth',e.target.value)} value={formData.mentHlth.answer}  />
                </div>


            {/* Select 1 */}
            {formData.select_questions.map((question, index) => (

              <div>
                <label className="block text-gray-700">{question.text_question ? question.text_question : question.question}</label>
                <select
                  name={question.question}
                  value={question.answer}
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
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
              >
                Predecir
              </button>
              <button
                type="button"
                className="bg-blue-600 ml-2 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                onClick={ClearQuestions}
              >
                Limpiar
              </button>
              <button
                type="button"
                className="bg-blue-600 ml-2 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                onClick={fillQuestionsCase1}
              >
                Caso1
              </button>
              <button
                type="button"
                className="bg-blue-600 ml-2 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                onClick={fillQuestionsCase2}
              >
                Caso2
              </button>
              <button
                type="button"
                className="bg-blue-600 ml-2 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                onClick={fillQuestionsCase3}
              >
                Caso3
              </button>
            </div>
          </form>
        </div>

        {/* Columna derecha (resultados) - 50% del ancho */}
        <div className="bg-gray-200 p-6 rounded-lg shadow flex items-between justify-between">
          <div className="flex flex-col w-full ">
          {prediction.diabetes_percentage?
          <div>
            <div className="flex flex-row justify-between w-full">
              <div className={`${getClassName(prediction.diabetes_percentage)} w-80 m-2 p-4`}>

                <span>{getNivelDeRiesgoTitle(prediction.diabetes_percentage)}</span>
              </div>
              <span className="m-4">{(prediction.diabetes_percentage * 100).toFixed(2)}%</span>
            </div>
            <div className="mt-4 p-4 bg-blue-100 border border-blue-500 text-blue-700 rounded-lg">
          <p>{getRecommendation(prediction.diabetes_percentage)}</p>
          
        </div>
</div>
              :null}
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
