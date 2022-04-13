import React from "react";
import styled from 'styled-components';
import { ClipboardPlus,PcDisplayHorizontal } from 'react-bootstrap-icons';
import Link from "next/link";
import {useRouter} from "next/router";

const UlLft = styled.ul`
  padding: 0;
  li{
    display: flex;
    align-content: center;
    margin-bottom:10px;
    padding:10px 20px;
    .lft{
      margin-right: 10px;
    }
    .rht{
      line-height: 1.8em;
    }
    a{
      text-decoration: none;
      color: #666666;
    }
    &:hover,&.active{
      background: #f8f8f8;
      border-radius: 8px;
    }
  }
`

export default function LeftBox() {
    const router = useRouter();
    return <div>
        <UlLft>
            <li className={ router.pathname==='/'?'active':''}>
                <span className="lft"><ClipboardPlus color="#bbb"/></span>
                <span className="rht"><Link href='/'>Create/Recovery ETH Address</Link></span>
            </li>
            <li className={ router.pathname==='/batch'?'active':''}>
                <span className="lft"><PcDisplayHorizontal color="#bbb"/></span>
                <span className="rht"><Link href='/batch'>Batch Create ETH Address</Link></span>
            </li>
        </UlLft>
    </div>
}
