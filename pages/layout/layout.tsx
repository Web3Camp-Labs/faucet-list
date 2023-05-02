import React, {ReactNode, ReactElement, useEffect, useState} from 'react'
import HeaderTop from "./headTop";
import styled from "styled-components";
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import FooterBox from "./footerBox";

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
const MainBox = styled.div`
    display: flex;
  flex-grow: 1;
`

const BgBox = styled(Container)`
  margin-top: 20px;
`

const CardBox = styled.div`
  //border:0;
  //box-shadow: 0 0 5px #ccc;
  //border-radius: 6px;
  //background: #fff;
  //padding: 30px;
  //border-radius: 20px;
//border: 1px solid #EDEFF0;
`

const TopLine = styled.div`
    margin-bottom: 20px;
`
const Lft = styled.div`
    display: flex;
  align-items: center;
  .imgBox{
    width: 96px;
    height: 96px;
    background: #fff;
    border-radius: 20px;
    border: 1px solid #EDEFF0;
    padding: 13px;
    margin-right: 16px;
    box-sizing: border-box;
    img{
      max-width: 100%;
      max-height: 100%;
    }
  }
`

const ButtonBox = styled.div`
    padding: 20px 0;
    text-align: right;
`
const TitleBox = styled.div`
  font-family: Helvetica;
  font-size: 16px;
  .tit{
    font-size: 18px;
    line-height: 22px;
    font-weight: bold;
  }
`

const ButtonBG = styled.div`
  border-radius: 5px;
  border: 1px solid #000;
  display: inline-block;
  padding: 6px 20px;
  line-height: 32px;
  cursor: pointer;
  color:#000;
  .close{
    padding-left: 20px;
  }
`


interface LayoutProps {
    children: any;
}

export default function  Layout<FC>({ children }: LayoutProps ) {
    const [account,setAccount] = useState();

    const getAccount = async () =>{
        const { ethereum } = window;
        if (typeof ethereum == 'undefined') {
            return {
                type: 'error'
            };
        }
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        sessionStorage.setItem('account',accounts[0]);
        setAccount(accounts[0])
    }

    const Logout = () =>{
        window.location.reload();
        sessionStorage.removeItem('account');
    }


    const AddresstoShow = (address:string) => {
        let frontStr = address.substring(0, 5);
        let afterStr = address.substring(address.length - 5, address.length);
        return `${frontStr}...${afterStr}`
    }

    return <MainContent>
            <HeaderTop />

            <MainBox>
                <BgBox>
                    <Row>
                        <Col md={12}>
                            <TopLine>
                                <Row>
                                    <Col md={6}>
                                        <Lft>
                                            <div className="imgBox"><img src="./faucet.png" alt=""/></div>
                                            <TitleBox>
                                                <div className="tit">Faucet</div>
                                                <div>Token faucet web app various tokens.</div>
                                            </TitleBox>
                                        </Lft>
                                    </Col>
                                    <Col md={6}>


                                        {
                                            !account &&  <ButtonBox><Button variant="flat" onClick={()=>getAccount()}>Connect Wallet</Button></ButtonBox>
                                        }
                                        {
                                            !!account &&<ButtonBox><ButtonBG onClick={()=>Logout()}>{AddresstoShow(account)} <span className="close">✕</span></ButtonBG></ButtonBox>
                                        }
                                        {/*<ButtonBox>*/}
                                        {/*    <a href="https://github.com/Web3-Camp/faucet-list/issues/new" target="_blank" rel="noreferrer"><Button variant="flat">Add New Faucet</Button></a>*/}
                                        {/*</ButtonBox>*/}
                                    </Col>
                                </Row>
                            </TopLine>
                        </Col>
                        <Col md={12}> <CardBox>{ children }</CardBox></Col>
                    </Row>
                </BgBox>
               </MainBox>
            <FooterBox />
        </MainContent>
}
