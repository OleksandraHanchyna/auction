import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';
import { Button, Layout, List, Pagination } from 'antd';
import CardAuction from '../card/CardAuction';
import SearchAuctions from '../SearchAuctions';
import FilterAuctions from '../FilterAuctions';
import { getAuctions } from '../../../api/auction';
import { useDispatch } from 'react-redux';
import { loading } from '../../../store/LoaderReducer';
import { PlusSquareOutlined } from '@ant-design/icons';
import { pageSizeListAuctions } from '../../../static/variables';
import './ListAuctions.scss';



// const data = [
//   {
//     id: 1,
//     title: 'Auction title #1',
//     smallDescription: 'This is a small description',
//     description: 'This is a description',
//     currentRate: '150',
//     stepRate: '10',
//     currency: '$',
//     img: [
//       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
//     ],
//     altImg: 'example',
//     tookPart: false,
//     liked: false,
//     ownerUser: {
//       id:'1',
//       username:'Test Test',
//       avatar:'',
//     },
//   },
//   {
//     id: 2,
//     title: 'Auction title #2',
//     smallDescription: 'This is a small description',
//     description: 'This is a description',
//     currentRate: '200',
//     stepRate: '10',
//     currency: '$',
//     img: [
//       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
//     ],
//     altImg: 'example',
//     tookPart: false,
//     liked: false,
//     ownerUser: {
//       id:'1',
//       username:'Test Test',
//       avatar:'',
//     },
//   },
//   {
//     id: 3,
//     title: 'Auction title #3',
//     smallDescription: 'This is a small description',
//     description: 'This is a description',
//     currentRate: '10',
//     stepRate: '1',
//     currency: '$',
//     img: [
//       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
//     ],
//     altImg: 'example',
//     tookPart: false,
//     liked: false,
//     ownerUser: {
//       id:'1',
//       username:'Test Test',
//       avatar:'',
//     },
//   },
//   {
//     id: 4,
//     title: 'Auction title #4',
//     smallDescription: 'This is a small description',
//     description: 'This is a description',
//     currentRate: '105',
//     stepRate: '10',
//     currency: '$',
//     img: [
//       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
//     ],
//     altImg: 'example',
//     tookPart: false,
//     liked: false,
//     ownerUser: {
//       id:'1',
//       username:'Test Test',
//       avatar:'',
//     },
//   },
//   {
//     id: 5,
//     title: 'Auction title #5',
//     smallDescription: 'This is a small description',
//     description: 'This is a description',
//     currentRate: '150',
//     stepRate: '10',
//     currency: '$',
//     img: [
//       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
//     ],
//     altImg: 'example',
//     tookPart: false,
//     liked: false,
//     ownerUser: {
//       id:'1',
//       username:'Test Test',
//       avatar:'',
//     },
//   },
//   {
//     id: 6,
//     title: 'Auction title #6',
//     smallDescription: 'This is a small description',
//     description: 'This is a description',
//     currentRate: '200',
//     stepRate: '10',
//     currency: '$',
//     img: [
//       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
//     ],
//     altImg: 'example',
//     tookPart: false,
//     liked: false,
//     ownerUser: {
//       id:'1',
//       username:'Test Test',
//       avatar:'',
//     },
//   },
//   {
//     id: 7,
//     title: 'Auction title #7',
//     smallDescription: 'This is a small description',
//     description: 'This is a description',
//     currentRate: '10',
//     stepRate: '1',
//     currency: '$',
//     img: [
//       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
//     ],
//     altImg: 'example',
//     tookPart: false,
//     liked: false,
//     ownerUser: {
//       id:'1',
//       username:'Test Test',
//       avatar:'',
//     },
//   },
//   {
//     id: 8,
//     title: 'Auction title #8',
//     smallDescription: 'This is a small description',
//     description: 'This is a description',
//     currentRate: '105',
//     stepRate: '10',
//     currency: '$',
//     img: [
//       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
//     ],
//     altImg: 'example',
//     tookPart: false,
//     liked: false,
//     ownerUser: {
//       id:'1',
//       username:'Test Test',
//       avatar:'',
//     },
//   },
//   {
//     id: 9,
//     title: 'Auction title #9',
//     smallDescription: 'This is a small description',
//     description: 'This is a description',
//     currentRate: '150',
//     stepRate: '10',
//     currency: '$',
//     img: [
//       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
//     ],
//     altImg: 'example',
//     tookPart: false,
//     liked: false,
//     ownerUser: {
//       id:'1',
//       username:'Test Test',
//       avatar:'',
//     },
//   },
//   {
//     id: 10,
//     title: 'Auction title #10',
//     smallDescription: 'This is a small description',
//     description: 'This is a description',
//     currentRate: '200',
//     stepRate: '10',
//     currency: '$',
//     img: [
//       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
//     ],
//     altImg: 'example',
//     tookPart: false,
//     liked: false,
//     ownerUser: {
//       id:'1',
//       username:'Test Test',
//       avatar:'',
//     },
//   },
//   {
//     id: 11,
//     title: 'Auction title #11',
//     smallDescription: 'This is a small description',
//     description: 'This is a description',
//     currentRate: '10',
//     stepRate: '1',
//     currency: '$',
//     img: [
//       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
//     ],
//     altImg: 'example',
//     tookPart: false,
//     liked: false,
//     ownerUser: {
//       id:'1',
//       username:'Test Test',
//       avatar:'',
//     },
//   },
//   {
//     id: 12,
//     title: 'Auction title #12',
//     smallDescription: 'This is a small description',
//     description: 'This is a description',
//     currentRate: '105',
//     stepRate: '10',
//     currency: '$',
//     img: [
//       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
//     ],
//     altImg: 'example',
//     tookPart: false,
//     liked: false,
//     ownerUser: {
//       id:'1',
//       username:'Test Test',
//       avatar:'',
//     },
//   },
//   {
//     id: 13,
//     title: 'Auction title #13',
//     smallDescription: 'This is a small description',
//     description: 'This is a description',
//     currentRate: '150',
//     stepRate: '10',
//     currency: '$',
//     img: [
//       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
//     ],
//     altImg: 'example',
//     tookPart: false,
//     liked: false,
//     ownerUser: {
//       id:'1',
//       username:'Test Test',
//       avatar:'',
//     },
//   },
//   {
//     id: 14,
//     title: 'Auction title #14',
//     smallDescription: 'This is a small description',
//     description: 'This is a description',
//     currentRate: '200',
//     stepRate: '10',
//     currency: '$',
//     img: [
//       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
//     ],
//     altImg: 'example',
//     tookPart: false,
//     liked: false,
//     ownerUser: {
//       id:'1',
//       username:'Test Test',
//       avatar:'',
//     },
//   },
//   {
//     id: 15,
//     title: 'Auction title #15',
//     smallDescription: 'This is a small description',
//     description: 'This is a description',
//     currentRate: '10',
//     stepRate: '1',
//     currency: '$',
//     img: [
//       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
//     ],
//     altImg: 'example',
//     tookPart: false,
//     liked: false,
//     ownerUser: {
//       id:'1',
//       username:'Test Test',
//       avatar:'',
//     },
//   },
//   {
//     id: 16,
//     title: 'Auction title #16',
//     smallDescription: 'This is a small description',
//     description: 'This is a description',
//     currentRate: '105',
//     stepRate: '10',
//     currency: '$',
//     img: [
//       'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
//     ],
//     altImg: 'example',
//     tookPart: false,
//     liked: false,
//     ownerUser: {
//       id:'1',
//       username:'Test Test',
//       avatar:'',
//     },
//   },
// ];

const ListAuctions = () => {
  const [page, setPage] = useState(1);
  const [auctions, setActions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAuctionList = async() => {
    dispatch(loading());

    try {
      const response = await getAuctions();
      setActions(response.data);
    } catch (err) {
      console.log('AxiosError:',err);
      return err;
    } finally {
      dispatch(loading());
    }
  };

  useEffect(() => {
    getAuctionList();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const onCreateAuction = () => navigate('/card/new');

  const onPageChange = page => setPage(page);

  return (
    <Layout className="auctions">
      <div className="auctions--sort--create-block">
        <div className="auctions--sort-block">
          <SearchAuctions />
          <FilterAuctions />
        </div>
        <Button
          className="auctions--create-block"
          onClick={onCreateAuction}
          icon={<PlusSquareOutlined />}
        >
          Create Auction
        </Button>
      </div>
      <List
        className="auctions--card"
        dataSource={auctions}
        renderItem={(item, index) => {
          const i = index + 1;
          return ( i >= ((page - 1) * pageSizeListAuctions + 1) && i <= page * pageSizeListAuctions)
            ? (<List.Item className="auction-card">
                <CardAuction auction={ item }/>
              </List.Item>)
            : null;
        }}
      />
      <Pagination
        defaultCurrent={page}
        pageSize={pageSizeListAuctions}
        total={auctions.length}
        onChange={onPageChange}
      />
    </Layout>
  );
};

export default ListAuctions;
