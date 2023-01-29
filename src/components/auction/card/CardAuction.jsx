import React, { useEffect, useState } from 'react';
import { EditOutlined, HeartOutlined, EyeOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { parseFile } from '../../../utils/parseData';
import './CardAuction.scss';

const { Meta } = Card;

const CardAuction = ({ auction }) => {
  const user = useSelector(state => state.auth.user);
  const [cardInfo, setCardInfo] = useState(auction);
  const [cardActions, setCardActions] = useState([
    {
      key: 'heart',
      icon: <HeartOutlined/>,
      style: 'card__action',
      onClick: () => setCardInfo({ ...cardInfo, liked: !cardInfo.liked }),
    },
    {
      key: 'eye',
      icon: <EyeOutlined/>,
      style: 'card__action',
      onClick: () => navigate('/view/' + cardInfo.id ),
    },
  ]);
  const [src, setSrc] = useState('');
  const navigate = useNavigate();

  useEffect( () => {
    if(cardInfo.owner.id === user.id
      && !cardActions.some(action => action.key === 'edit')) {
      const actions = [...cardActions];
      actions.unshift({
          key: 'edit',
          style: 'card__action',
          icon: <EditOutlined/>,
          onClick: () => navigate('/card/' + cardInfo.id ),
        },
      );
      setCardActions(actions);
    }
    if(cardInfo.images) {
      setSrc(parseFile(cardInfo.images)[0]);
    }
  }, []);

  useEffect(() => {
    // const actions = [...cardActions];
    // const action = cardActions.find(a => a.key === 'heart');
    // action.style += '_liked';
    //
    // if(!action.style.contains('_liked') && cardInfo.liked) {
    //   action.style.concat('_liked');
    // }
    //
    // if(action.style.contains('_liked') && !cardInfo.liked) {
    //   action.style.replace('_liked', '');
    // }
    // const index = actions.length === 3 ? 1 : 0;
    // actions.splice(index, 1, action);
    // setCardActions(actions);
    //
    // console.log('actions', actions);
  }, [cardInfo.liked]);

  return (
    <Card
      className="card"
      cover={
        <img
          className="card__img"
          alt={cardInfo.altImg || ''}
          src={src || 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'}
        />
      }
      actions={
        cardActions?.map(action => (
          <div
            key={action.key}
            className={action.style}
            onClick={action.onClick}
          >
            { action.icon }
          </div>
        ))
      }
    >
      <Meta
        title={
            <div className="card__title">
              <Avatar
                src={cardInfo.owner.avatar || ''}
              />
              {cardInfo.title}
            </div>
           }
        description={
          <div className="card__info">
            <div className="card__info__description">
              Description Description Description Description Description Description Description Description Description Description Description Description
            </div>
            <div className="card__info__actual__rate">
              <div className="card__info__actual__rate-block">
                <div className="card__info-small">
                  Rate:
                </div>
                <div className="card__info__value">
                  {cardInfo.startPrice} $
                </div>
              </div>
              <div className="card__info__actual__rate-block">
                <div className="card__info-small">
                  Step rate:
                </div>
                <div className="card__info__value">
                  {cardInfo.step} $
                </div>
              </div>
            </div>
          </div>
        }
      />
    </Card>
  );
};
export default CardAuction;