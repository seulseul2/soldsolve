import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"
import NavBar from '../../components/NavBar';
import SearchBar from './SearchBar';

import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import CopyToClipboard from 'react-copy-to-clipboard';
import LiveButton from '../Products/LiveButton';
import LikeButton from '../Products/LikeButton';


function SearchProduct() {
    const [searchData, setSearchData] = useState([]);
    const params = useParams();
    // console.log(params)

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(
                `/api/product`,
                {
                    params: {
                        title: params.title
                    }
                }
            );
            if (result.data.length > 0) {
                setSearchData(result.data)
            } else {
                const allData = await axios.get(`/api/product`);
                // console.log(allData)
                setSearchData(allData.data)
            }
        }
        fetchData();
    }, []);

    const ShowProducts = () => {
        return (
            <>
                {searchData.map((product) => {
                    let mainImg = null;
                    if (product.productImg.length>0) {
                      mainImg = 'https://i7c110.p.ssafy.io'+product.productImg[0].path
                    }
                    let pTitle = null;
                    if (product.title.length > 8){
                      pTitle = product.title.substr(0,8)+"...";
                    } else {
                      pTitle = product.title
                    }
                    return (

                        <li className='cards_item' key={product.no}>
                            <div className='card'>
                                <a href={`/product/${product.no}`}>
                                    <img className='card_image'
                                        src={mainImg}
                                        alt={product.title}
                                    />
                                    <div className='card_content'>
                                        <h5 className='card_title'>{pTitle}</h5>
                                        <p className='card_text'>{product.price} 원</p>
                                    </div>

                                </a>
                                <CardActions disableSpacing sx={{ justifyContent: 'space-around', marginTop: "-10px" }}>
                                    <LikeButton no={product.no} />
                                    <LiveButton no={product.no} />
                                    <IconButton aria-label="share" onClick={function () { alert('링크가 복사되었습니다.') }} >
                                        <CopyToClipboard text={`https://i7c110.p.ssafy.io/product/` + product.no}>
                                            <ShareIcon />
                                        </CopyToClipboard>
                                    </IconButton>
                                </CardActions>
                            </div>

                        </li>


                    );
                })}
            </>
        );
    };

    return (
        <>
        <div className='fixnav'>
            <NavBar />
            </div>
            <SearchBar></SearchBar>
            <div className='content'>
                <ul className='cards' id='maincontent'>
                    {<ShowProducts />}
                </ul>
            </div>
        </>
    )
}

export default SearchProduct