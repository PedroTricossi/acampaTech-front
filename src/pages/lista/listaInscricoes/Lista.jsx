import React from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";

import {FaCampground} from "react-icons/fa";

import "./style.scss";

const Lista = () => {
    const { data, loading } = useFetch(`/acampamento/campista/1`);
    return (
        <div className="listaDeIncricoes">
            <ContentWrapper>
                <div className="listaAcampamento">
                    <ul >
                        Suas inscrições
                        {
                            data?.map((item) =>{
                                return(
                                    <li className="item">
                                        {item.nome}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </ContentWrapper>
        </div>
    );
}

export default Lista;