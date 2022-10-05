import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../componenets/header/Header";
import basicImg from "../../assert/image/basic.png";
import { useInView } from "react-intersection-observer";
import { instance } from "../../shared/Api";

const List = () => {
  const navigate = useNavigate();

  const THEME_CODE = window.localStorage.getItem("THEME_CODE");
  const AREA_CODE = window.localStorage.getItem("AREA_CODE");
  const SIGUNGU_CODE = window.localStorage.getItem("SIGUNGU_CODE");
  const THEME_NAME = window.localStorage.getItem("THEME_NAME");
  const AREA_NAME = window.localStorage.getItem("AREA_NAME");
  const SIGUNGU_NAME = window.localStorage.getItem("SIGUNGU_NAME");

  const [ list, setList ] = useState();

  const getList = async() => {
    const res = await instance.get(`/api/place?theme=${THEME_CODE}&areaCode=${AREA_CODE}&sigunguCode=${SIGUNGU_CODE}&pageNum=0`);
    setList(res.data)
  }

  useEffect(() => {
    getList();
  }, []);

  const returnHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("THEME_CODE");
    localStorage.removeItem("THEME_NAME");
    localStorage.removeItem("AREA_CODE");
    localStorage.removeItem("AREA_NAME");
    localStorage.removeItem("SIGUNGU_CODE");
    localStorage.removeItem("SIGUNGU_NAME");
    navigate("/select");
  };

  return (
    <StList>
      <Header />
      {/* <button onClick={returnHandler}>〈 다시 선택하기</button> */}
      <Title>
        <div>
          <p>{THEME_NAME}</p>
        </div>
        <p>‣</p>
        <div>
          <p>{AREA_NAME}</p>
        </div>
        <p>‣</p>
        <div>
          <p>{SIGUNGU_NAME}</p>
        </div>
      </Title>
      <Content>
        {list&&list.map((list) => (
          <Card key={list.id} onClick={() => navigate(`/detail/${list.id}`)}>
            {list.image == null ? (
              <>
                <BasicImg src={basicImg} />
                <BasicName>
                  <div>{list.title}</div>
                  <div>
                    <Star>★</Star> {list.star}
                  </div>
                </BasicName>
              </>
            ) : (
              <>
                <ImgShadow>
                  <ImgBox>
                    <Img src={list.image} />
                  </ImgBox>
                </ImgShadow>
                <Name>
                  <div>{list.title}</div>
                  <div>
                    <Star>★</Star> {list.star}
                  </div>
                </Name>
              </>
            )}
          </Card>
        ))}
      </Content>
    </StList>
  );
};

export default List;

const StList = styled.div`
  width: 428px;
  margin: 0 auto;
  
  & button {
    margin-left: 15px;
    margin-top: 30px;
    background: #ffc0c0;
    height: 40px;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    font-size: 17px;
    text-align: center;
    color: #ffffff;

    &:hover {
      cursor: pointer;
    }
  }
`;

const Title = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
  top: 30px;
  height: 150px;
  width: 428px;
  z-index: 1;
  background-color: #ffffff;

  & div {
    width: 90px;
    height: 50px;
    background-color: #c4e0ec;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    margin: auto 15px;
  }

  & p {
    color: #ffc0c0;
    font-size: 45px;
    font-weight: 700;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  & div > p {
    display: flex;
    justify-content: center;
    margin-block-start: 8px;
    margin-block-end: 0;
    color: #ffffff;
    font-size: 24px;
    font-weight: normal;
    text-shadow: none;
    margin-top: 13px;
  }
`;

const Card = styled.div`
  text-align: center;
`;

const Content = styled.div`
  position: relative;
  top: 230px;
`;

const BasicImg = styled.img`
  position: relative;
  width: 420px;
  height: 234px;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
  }
`;

const ImgShadow = styled.div`
  margin: 0 auto;
  width: 420px;
  height: 235px;
  border-radius: 20px;
  /* z-index: 3; */
  &:hover {
    cursor: pointer;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  }
`;

const ImgBox = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 235px;
  border-radius: 20px;
  box-shadow: inset 0 -30px 70px #2e2e2e;
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  position: relative;
  width: 100%;
  height: 234px;
  z-index: -2;
  border-radius: 20px;
`;

const Name = styled.div`
  display: flex;
  position: relative;
  top: -55px;
  text-align: initial;
  margin-left: 35px;
  color: #ffffff;
  font-size: 23px;
  line-height: 33px;
  margin-block-end: 0;
  margin-block-start: 0;
  gap: 20px;

  & div {
    display: flex;
    gap: 5px;
  }
`;

const BasicName = styled.div`
  display: flex;
  position: relative;
  top: -55px;
  text-align: initial;
  margin-left: 35px;
  color: #414141;
  font-size: 23px;
  line-height: 33px;
  margin-block-end: 0;
  margin-block-start: 0;
  gap: 20px;

  & div {
    display: flex;
    gap: 5px;
  }
`;

const Star = styled.p`
  color: gold;
  font-size: 23px;
`;