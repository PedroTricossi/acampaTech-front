import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../utils/auth.service";

import "./style.scss";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const SignUp = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [escolaridade, setEscolaridade] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [rg, setRg] = useState("");
  const [orgaoExpeditor, setOrgaoExpeditor] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [acampamentosRealizados, setAcampamentosRealizados] = useState([])
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangeName = (e) => {
    const nome = e.target.value;
    setNome(nome);
  };

  const onChangeNacionalidade = (e) => {
    const nacionalidade = e.target.value;
    setNacionalidade(nacionalidade);
  };

  const onChangeEstadoCivil = (e) => {
    const estadoCivil = e.target.value;
    setEstadoCivil(estadoCivil);
  };

  const onChangeEscolaridade = (e) => {
    const escolaridade = e.target.value;
    setEscolaridade(escolaridade);
  };

  const onChangeDataNascimento = (e) => {
    const dataNascimento = e.target.value;
    setDataNascimento(dataNascimento);
  };

  const onChangeRg = (e) => {
    const rg = e.target.value;
    setRg(rg);
  };

  const onChangeOrgaoExpeditor = (e) => {
    const orgaoExpeditor = e.target.value;
    setOrgaoExpeditor(orgaoExpeditor);
  };

  const onChangeCpf = (e) => {
    const cpf = e.target.value;
    setCpf(cpf);
  };

  const onChangeEndereco = (e) => {
    const endereco = e.target.value;
    setEndereco(endereco);
  };

  const onChangeBairro = (e) => {
    const bairro = e.target.value;
    setBairro(bairro);
  };

  const onChangeCidade = (e) => {
    const cidade = e.target.value;
    setCidade(cidade);
  };

  const onChangeEstado = (e) => {
    const estado = e.target.value;
    setEstado(estado);
  };

  const onChangeCep = (e) => {
    const cep = e.target.value;
    setCep(cep);
  };

  const handleChangeCheckbox = (e) => {
    if (e.target.checked) {
       setAcampamentosRealizados([...acampamentosRealizados, e.target.value]);
    } else {
       setAcampamentosRealizados(acampamentosRealizados.filter((item) => item !== e.target.value));
    }

    
 }

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    // console.log(acampamentosRealizados)

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password, nome, nacionalidade, estadoCivil, escolaridade,
        dataNascimento, rg, orgaoExpeditor, cpf, endereco, bairro, cidade, estado, cep, acampamentosRealizados).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          navigate("/login");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-login-dark">
      <div className="div">
      <Form onSubmit={handleRegister} ref={form}>
        <div className="form">

          <button className="login-btn" >login</button>  

          <input className="username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required]}
                        placeholder="Nome de Usuario">
          </input>

          <input className="password"
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            validations={[required]}
            placeholder="Senha">
          </input>



          <input className="email"
                        type="text"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required]}
                        placeholder="Email">
          </input>

          <input className="nome"
                        type="text"
                        name="Nome Completo"
                        value={nome}
                        onChange={onChangeName}
                        validations={[required]}
                        placeholder="Nome Completo">
          </input>

           <input className="nacionalidade"
                        type="text"
                        name="nacionalidade"
                        value={nacionalidade}
                        onChange={onChangeNacionalidade}
                        validations={[required]}
                        placeholder="Nacionalidade">
          </input>

          <input className="estadoCivil"
                        type="text"
                        name="estadoCivil"
                        value={estadoCivil}
                        onChange={onChangeEstadoCivil}
                        validations={[required]}
                        placeholder="Estado Civil">
          </input>

          <select name="escolaridade" className="escolaridade"
          value={escolaridade} onChange={onChangeEscolaridade}>
            <option value="">Selecione sua escolaridade</option>
            <option value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto</option>
            <option value="Ensino Fundamental Completo">Ensino Fundamental Completo</option>
            <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
            <option value="Ensino Médio Completo">Ensino Médio Completo</option>
            <option value="Ensino Superior Incompleto">Ensino Superior Incompleto</option>
            <option value="Ensino Superior Completo">Ensino Superior Completo</option>
            <option value="Mestre">Mestre</option>
            <option value="Doutor">Doutor</option>
          </select>



          <input className="dataNascimento"
                        type="date"
                        name="dataNascimento"
                        value={dataNascimento}
                        onChange={onChangeDataNascimento}
                        validations={[required]}
                        placeholder="Data de nascimento">
          </input>

          <input className="rg"
                        type="text"
                        name="rg"
                        value={rg}
                        onChange={onChangeRg}
                        validations={[required]}
                        placeholder="RG">
          </input>

          <input className="orgaoExpeditor"
                        type="text"
                        name="orgaoExpeditor"
                        value={orgaoExpeditor}
                        onChange={onChangeOrgaoExpeditor}
                        validations={[required]}
                        placeholder="Orgão Expeditor">
          </input>

          <input className="cpf"
                        type="text"
                        name="cpf"
                        value={cpf}
                        onChange={onChangeCpf}
                        validations={[required]}
                        placeholder="CPF">
          </input>

          <input className="endereco"
                        type="text"
                        name="endereco"
                        value={endereco}
                        onChange={onChangeEndereco}
                        validations={[required]}
                        placeholder="Endereço">
          </input>

          <input className="bairro"
                        type="text"
                        name="bairro"
                        value={bairro}
                        onChange={onChangeBairro}
                        validations={[required]}
                        placeholder="Bairro">
          </input>

          <input className="cidade"
                        type="text"
                        name="cidade"
                        value={cidade}
                        onChange={onChangeCidade}
                        validations={[required]}
                        placeholder="Cidade">
          </input>

          <input className="estado"
                        type="text"
                        name="estado"
                        value={estado}
                        onChange={onChangeEstado}
                        validations={[required]}
                        placeholder="Estado">
          </input>

          <input className="cep"
                        type="text"
                        name="cep"
                        value={cep}
                        onChange={onChangeCep}
                        validations={[required]}
                        placeholder="CEP">
          </input>

          <h3 className="h3CheckBox" >Marque quais acampamentos você já fez:</h3>

          <div className="AcampamentoJuvenil">
            <input value = "Acampamento Juvenil" type = "checkbox" onChange = {handleChangeCheckbox} />
            <span> Acampamento Juvenil </span>
          </div>

          <div className="AcampamentoCasais">
            <input value = "Acampamento de Casais" type = "checkbox" onChange = {handleChangeCheckbox} />
            <span> Acampamento de Casais </span>
          </div>

          <div className="AcampamentoJoam">
            <input value = "Acampamento Joam" type = "checkbox" onChange = {handleChangeCheckbox} />
            <span> Acampamento Joam </span>
          </div>

          <div className="AcampamentoFac">
            <input value = "Acampamento FAC" type = "checkbox" onChange = {handleChangeCheckbox} />
            <span> Acampamento FAC </span>
          </div>

          <div className="AcampamentoCes">
            <input value = "Acampamento CES" type = "checkbox" onChange = {handleChangeCheckbox} />
            <span> Acampamento CES </span>
          </div>

          <div className="AcampamentoMirim">
            <input value = "Acampamento Mirim" type = "checkbox" onChange = {handleChangeCheckbox} />
            <span> Acampamento Mirim </span>
          </div>

          <div className="AcampamentoMaanaim">
            <input value = "Acampamento Maanaim" type = "checkbox" onChange = {handleChangeCheckbox} />
            <span> Acampamento Maanaim </span>
          </div>

          <div className="AcampamentoMulheres">
            <input value = "Acampamento Muheres" type = "checkbox" onChange = {handleChangeCheckbox} />
            <span> Acampamento de Muheres </span>
          </div>

        </div>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
    ); 
};

export default SignUp;