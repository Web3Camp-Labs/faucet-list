import React, {ReactNode, useEffect, useState} from "react";
import styled from "styled-components";
import {Button} from "react-bootstrap";

import Layout from "./layout/layout";
import faucetList from '../public/list.json';
import ResultJson from "../public/result.json";
import ImageArr from "../public/icons/imageArr.json";


const ListBox = styled.div`
  ul{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    //&:after{
    //  clear:both;
    //  display: block;
    //  content:'';
    //  width:0;
    //  height:0;
    //  visibility:hidden;
    //}
  }
  li{
    border: 2px solid #EDEFF0;
    background: #fff;
    border-radius: 20px;
    width: 32%;
    margin-bottom: 40px;
    text-align: center;
    padding:20px 20px 0;
    //float:left;
    box-sizing: border-box;
    //margin-right: 4%;
    //background: #ff0;
    //&:nth-child(4n){
    //  margin-right: 0;
    //}
    &:hover{
        box-shadow: 0px 20px 40px 0px #F7F7F7;
        border-radius: 20px;
        border: 2px solid #EDEFF0;
    }
    &:last-child:nth-child(3n - 1) {
      margin-right: 34%;
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
  //img{
  //  width: 96px;
  //  height: 96px;
  //  border-radius: 100px;
  //}
`

const FlexLine  = styled.div`
    display: flex;
  align-items: center;
  img{
    width: 20px;
    height: 20px;
    border-radius: 20px;
    margin-right: 10px;
  }
  .nameRht{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .sym{
    opacity: 0.6;
  }
`

const BtmUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  padding-top: 20px;
    div{
      border: 1px solid rgba(0,0,0,0.1);
      background: #f8f8f8;
      border-radius: 5px;
      width: 100%;
      text-align: left;
      padding: 10px;
      margin-bottom: 20px;
      cursor: pointer;
      &:hover{
        color: #000;
      }
    }
`


interface objProps{
    name: string
    address: string
    image?: string
}

export default function  Home<NextPage>() {
    const [list,setList] = useState<objProps[]>([]);
    const [account,setAccount] = useState('');

    useEffect(()=>{
        let acc = sessionStorage.getItem('account');
        if(!acc)return;
        setAccount(acc)
    },[])


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

    const switchStr = (str:string) =>{
        let domain = str?.split("://")[1];
        let aft1 = domain?.split("/")[0];
        let aft = aft1?.split("?")[0];
        return aft;
    }
    const formatLink = (str:string) =>{
        if(account){
           return  str.replace("${ADDRESS}",account);
        }
        return str;

    }
    const formatImg = (num:number) =>{
        console.log(num)
        const rt = ImageArr.filter((item)=>item.split(".")[0] === num.toString() )
        console.log(rt)
        if(rt.length){
            return `/faucet-list/icons/${rt[0]}`
        }else{
            return "/faucet-list/images/eth.png"
        }

    }

  return (<>

          <ListBox>
          <ul>
              {/*{*/}
              {/*    list.map((item,index)=>(<li key={index}>*/}
              {/*        <a href={item.address} target="_blank" rel="noreferrer">*/}
              {/*        <div>*/}
              {/*            <img src={`/faucet-list${item.image}`} alt=""/>*/}
              {/*        </div>*/}
              {/*        <div className="title">{item.name}</div>*/}
              {/*      </a>*/}
              {/*    </li>))*/}
              {/*}*/}
              {
                  ResultJson.map((item,index)=>(
                      <li key={`rt_${index}`}>
                          <FlexLine>
                              {/*<img src={item.image?'/faucet-list'+item.image:"/faucet-list/images/eth.png"} alt=""/>*/}
                              <img src={formatImg(item.chainId)} alt=""/>
                              {/*{item.chainId}*/}
                              <div className="nameRht">
                                  <span>{item.name}</span>
                                  {
                                      !!index &&<span className="sym">{item!.nativeCurrency?.symbol}</span>
                                  }

                              </div>
                          </FlexLine>

                          <BtmUl>
                              {
                                  item.faucets.map((innerItem,index)=>(<div key={`innerItem_${index}`}><a href={formatLink(innerItem)} target="_blank" rel="noreferrer">{switchStr(innerItem)}</a></div>))
                              }
                          </BtmUl>

                      </li>
                  ))
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
