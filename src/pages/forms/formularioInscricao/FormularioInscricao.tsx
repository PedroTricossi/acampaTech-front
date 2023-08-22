import React, { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import PostDataToApi from "../../../utils/apiPost";

interface inscricao {
    campistaId: number
    acampamentoId: number
    equipePreferencia: string
    familiaresAcampamento: string
}

interface response {
    response: string | "No Response"
}

let initialState: inscricao = {
    campistaId: 1,
    acampamentoId: 1,
    equipePreferencia: "",
    familiaresAcampamento: ""
}

const FormularioInscricao = () => {

    const { id } = useParams()
    const { data, loading } = useFetch(`/campista/1`);
    const [equipe, setEquipe] = useState('')
    const [familia, setFamilia] = useState('')
    const [inscricao, setInscricao] = useState<inscricao>(initialState)
    const [response, setResponse] = useState<response>()

    const onChangeHandlerEquipe = (e: ChangeEvent<HTMLInputElement>) => {
        setEquipe(e.target.value)
    }

    const onChangeHandlerFamilia = (e: ChangeEvent<HTMLInputElement>) => {
        setFamilia(e.target.value)
    }



    const sumbitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        inscricao.equipePreferencia = equipe;
        inscricao.familiaresAcampamento = familia;
        inscricao.acampamentoId = parseInt(id);
        axios.post<response>('http://localhost:8080/api/v1/camp/inscricao', inscricao)
        .then((response) => {
          setResponse(response.data)
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    return(
        <div className="formularioInscricao">
            {!loading ? (
                <>
                {
                !!data && (
            <React.Fragment>
                <ContentWrapper>
                    <form id="form" className="form" onSubmit={sumbitForm}>

                    <div className="form-control">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            id="name"
                            readOnly
                            value={`${data.nome}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="CPF">CPF</label>
                        <input
                            type="text"
                            id="CPF"
                            readOnly
                            value={`${data.cpf}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="RG">RG</label>
                        <input
                            type="text"
                            id="RG"
                            readOnly
                            value={`${data.rg}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="orgaoExpeditor">Orgao Expeditor</label>
                        <input
                            type="text"
                            id="orgaoExpeditor"
                            readOnly
                            value={`${data.orgaoExpeditor}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="Nacionalidade">Nacionalidade</label>
                        <input
                            type="text"
                            id="Nacionalidade"
                            readOnly
                            value={`${data.nacionalidade}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="estadoCivil">Estado Civil</label>
                        <input
                            type="text"
                            id="estadoCivil"
                            readOnly
                            value={`${data.nacionalidade}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="Data Nascimento">Data Nascimento</label>
                        <input
                            type="date"
                            id="Data Nascimento"
                            readOnly
                            value={`${data.dataNascimento}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="endereco">endereço</label>
                        <input
                            type="text"
                            id="endereco"
                            readOnly
                            value={`${data.endereco}`}
                        />

                    </div>

                    <div className="form-control">
                        <label htmlFor="Bairro">Bairro</label>
                        <input
                            type="text"
                            id="Bairro"
                            readOnly
                            value={`${data.bairro}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="Cidade">Cidade</label>
                        <input
                            type="text"
                            id="Cidade"
                            readOnly
                            value={`${data.cidade}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="Estado">Estado</label>
                        <input
                            type="text"
                            id="Estado"
                            readOnly
                            value={`${data.estado}`}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="CEP">CEP</label>
                        <input
                            type="text"
                            id="CEP"
                            readOnly
                            value={`${data?.cep}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="equipe">Qual equipe gostaria de trabalhar?</label>
                        <input
                            type="text"
                            id="equipe"
                            placeholder="Digite a equipe que gostaria de trabalhar.."
                            onChange={onChangeHandlerEquipe}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="email">Possui Familiares fazendo ou trabalhando no acampamento?</label>
                        <input type="text" id="email" placeholder="Digite o nome dos familiares.."
                        onChange={onChangeHandlerFamilia} />
                    </div>

                    <div className="bntSubmmit"
 
                        >
                        <button className="text" type="submit">Enviar</button>
                    </div>
                </form>
            </ContentWrapper>
        </React.Fragment>)
        }
        </>
    
            ) : (
                <div>
                    <button 
                        type="submit"
                        onClick={ () =>
                            PostDataToApi("/inscricao",
                                {
                                    campistaId: 1,
                                    acampamentoId: id,
                                    equipePreferencia: equipe,
                                    familiaresAcampamento: familia
                                }
                            )
                        }
                    >Enviar</button>
                </div>
            )
            }
      </div>

    )
}

export default FormularioInscricao;