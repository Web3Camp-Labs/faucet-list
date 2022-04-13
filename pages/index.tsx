import React, {ReactNode, useEffect, useState, useRef, ChangeEvent, ReactElement, ComponentType} from "react";
import styled from "styled-components";

import Layout from "./layout/layout";
import faucetList from '../public/list.json';

const ListBox = styled.div`
  ul{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  li{
    border: 1px solid #eee;
    width: 24%;
    margin-bottom: 20px;
    text-align: center;
    padding: 40px 0 20px;
  }
  .title{
    padding: 20px;
    margin-right: 20px;
    text-align: center;
  }
  img{
    width: 100px;
    height: 100px;
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

  return (<ListBox>
          <ul>
              {
                  list.map((item,index)=>(<li key={index}>
                      <a href={item.address} target="_blank" rel="noreferrer">
                      <div>
                          <img src={item.image} alt=""/>
                      </div>
                      <div className="title">{item.name}</div>
                    </a>
                  </li>))
              }
          </ul>
      </ListBox>
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
