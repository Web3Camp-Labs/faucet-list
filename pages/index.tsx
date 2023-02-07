import React, {ReactNode, useEffect, useState} from "react";
import styled from "styled-components";
import {Button} from "react-bootstrap"

import Layout from "./layout/layout";
import faucetList from '../public/list.json';

const ListBox = styled.div`
  ul{
    //display: flex;
    //justify-content: space-between;
    //flex-wrap: wrap;
    &:after{
      clear:both;
      display: block;
      content:'';
      width:0;
      height:0;
      visibility:hidden;
    }
  }
  li{
    border: 2px solid #fff;
    border-radius: 20px;
    width: 22%;
    margin-bottom: 40px;
    text-align: center;
    padding: 40px 0 20px;
    float:left;
    margin-right: 4%;
    //background: #ff0;
    &:nth-child(4n){
      margin-right: 0;
    }
    &:hover{
        box-shadow: 0px 20px 40px 0px #F7F7F7;
        border-radius: 20px;
        border: 2px solid #EDEFF0;
    }
  }
  .title{
    //padding: 20px;
    margin-right: 20px;
    text-align: center;
    font-size: 22px;
    font-family: "Helvetica";
    color: #2D1D0A;
    line-height: 31px;
    margin-top: 20px;
  }
  img{
    width: 96px;
    height: 96px;
    border-radius: 100px;
  }
`


interface objProps{
    name: string
    address: string
    image?: string
}

export default function  Home<NextPage>() {
    const [list,setList] = useState<objProps[]>([]);
    useEffect(()=>{
        const compareDESC = function (obj1:objProps, obj2:objProps) {
            const val1 = obj1.name;
            const val2 = obj2.name;
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        }
        let arr = faucetList.sort(compareDESC);
        setList(arr)
    },[])

  return (<>

          <ListBox>
          <ul>
              {
                  list.map((item,index)=>(<li key={index}>
                      <a href={item.address} target="_blank" rel="noreferrer">
                      <div>
                          <img src={`/faucet-list${item.image}`} alt=""/>
                      </div>
                      <div className="title">{item.name}</div>
                    </a>
                  </li>))
              }
          </ul>
      </ListBox>
      </>
  )
}


interface LayoutProps {
    children: ReactNode;
}


Home.getLayout = function getLayout(page:LayoutProps) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
