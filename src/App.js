import './App.css';
import formLogo from './assets/form-logo.png';

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object({
  name: yup.string().required("o nome é obrigatorio"),
  email: yup.string().email("digite um email válido").required("o email é obrigatorio"),
  password: yup.string().min(6, "a senha precisa ter 6 digitos pelo menos").required("Senha obrigatórias"),//minimo de 6 caracteres
  confirmPassword: yup.string().oneOf([yup.ref('password')], "as senhas devem ser iguais").required("confirma a senha é obrigatório")
}).required()

function App() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

  function onSubmit(userData) {
    console.log(userData);
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <img src={formLogo} alt="logo do formulario" />

      <label>
        Nome
        <input type="text" {...register("name")} />
        <span>{errors.name?.message}</span>
      </label>

      <label>
        Email
        <input {...register("email")} /> 
        <span>{errors.email?.message}</span>
      </label>

      <label>
        Senha
        <input type="password" {...register("password")} />
        <span>{errors.password?.message}</span>
      </label>

      <label>
        Confirmar Senha
        <input type="password"{...register("confirmPassword")} />
        <span>{errors.confirmPassword?.message}</span>
      </label>

      <button type="submit">Cadastrar-se</button>

    </form>
  );
}

export default App;
