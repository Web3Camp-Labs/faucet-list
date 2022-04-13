import React,{ ReactNode,ReactElement } from 'react'
import HeaderTop from "./headTop";
import styled from "styled-components";
import {Container, Row, Col, Card} from 'react-bootstrap';
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
  margin-top: 30px;
`

const CardBox = styled(Card)`
  border:0;
  box-shadow: 0 0 5px #ccc;
  border-radius: 6px;
`

interface LayoutProps {
    children: any;
}

export default function  Layout<FC>({ children }: LayoutProps ) {
    return <MainContent>
            <HeaderTop />
            <MainBox>
                <BgBox>
                    <Row>
                        <Col md={12}> <CardBox body>{ children }</CardBox></Col>
                    </Row>
                </BgBox>
               </MainBox>
            <FooterBox />
        </MainContent>
}
