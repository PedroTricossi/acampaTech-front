import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import {FaCampground} from "react-icons/fa";
import PostDataToApi from "../../../utils/apiPost";

const DetailsBanner = () => {
    const { id } = useParams();
    const { data: campista, loading: loadingCampista } = useFetch(`/acampamentoTrabalhado/1`);
    const { data, loading } = useFetch(`/acampamento/${id}`);
    const navigate = useNavigate();
    

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };


    return (
        <div className="detailsBanner">
            {
            !loading ? (
                <>
                    {
                    !!data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={"src/assets/Acampamento JOAM.jpeg"} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data ? (
                                            <Img
                                                className="posterImg"
                                                src={`${
                                                    "src/assets/" + data.nome + ".jpeg"
                                                }`}
                                            />
                                        ) : (
                                            <Img
                                                className="posterImg"
                                                src={PosterFallback}
                                            />
                                        )}
                                    </div>
                                     <div className="right">
                                        <div className="title">
                                            {`${
                                                data.nome 
                                            } (${dayjs(
                                                data.data_inicio
                                            ).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle">
                                            {data.tema}
                                        </div>
                                        
                                        {
                                        !loadingCampista ? (
                                            campista[0].acampamentoId == 104 ? (<div
                                                className="playbtn"
                                                    onClick={() => {
                                                        // console.log("CLICOU")
                                                        // PostDataToApi("/inscritos",
                                                        // {
                                                        //     campistaId: campista[0].campistaId,
                                                        //     acampamentoId: campista[0].acampamentoId,
                                                        //     inscricaoID: 1
                                                        // }
                                                        // );
                                                        navigate(
                                                            `/inscricao/${
                                                                id
                                                            }`
                                                        )
                                                    }}
                                                >
                                                    <button className="text">
                                                    <FaCampground />
                                                        Inscreva-se para trabalhar
                                                    </button>
                                            </div>) : (
                                                <div
                                                className="playbtn"
                                                    // onClick={() => {
                                                    //     setShow(true);
                                                    //     setVideoId(video.key);
                                                    // }}
                                                >
                                                    <button className="text">
                                                    <FaCampground />
                                                        Inscreva-se para fazer o acampamento
                                                    </button>
                                            </div>

                                            )
                                        ) : (
                                            <div>

                                            </div>
                                        )
                                    }
                                    
                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                {data.tema}
                                            </div>
                                        </div>
                                        


                                        <div className="info">
                                            {data.tema && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Status:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data.tema}
                                                    </span>
                                                </div>
                                            )}

                                            {
                                            data && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Data Inicio:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(
                                                            data.data_inicio
                                                        ).format("DD/MM/YYYY")}
                                                    </span>
                                                </div>
                                            )}

                                            {data.data_inicio && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Runtime:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {toHoursAndMinutes(
                                                            data.data_inicio
                                                        )}
                                                    </span>
                                                </div> 
                                            )}
                                        </div>
                                    
                                        {data.data_fim < Date.now() && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Fotos:{" "}
                                                </span>
                                                <span className="text">
                                                    {data.map((d, i) => (
                                                            <a>link fotos</a>
                                                    ))}
                                                </span>
                                            </div>
                                        )
                                        }

                                        {data.data_fim < Date.now() && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Playlist:{" "}
                                                </span>
                                                <span className="text">
                                                    {data.map((d, i) => (
                                                            <a>link playlist</a>
                                                    ))}
                                                </span>
                                            </div>
                                        )
                                        }

                                        {data.data_fim < Date.now() && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Playlist:{" "}
                                                </span>
                                                <span className="text">
                                                    {data.map((d, i) => (
                                                            <a>link playlist</a>
                                                    ))}
                                                </span>
                                            </div>
                                        )
                                        }
                                            
                                        </div>
                                    </div>
                            </ContentWrapper>
                        </React.Fragment>
                    )
                    }
                 </>)
             : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )
        }
        </div>
    );
};

export default DetailsBanner;
