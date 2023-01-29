import React, { useEffect, useState } from 'react';
import { useAuction } from '../../../hook/useAuction';
import {
  Button,
  Carousel,
  DatePicker,
  Form, Input,
  Typography,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { dateFormat } from '../../../static/variables';
import UserAction from './action/UserAction';
import './ViewAuction.scss';

const { Paragraph } = Typography;

const users = [
  {
    id: '1',
    username: 'Test Test 1',
    avatar: '',
    updateDate: new Date(),
  },
  {
    id:'2',
    username:'Test Test 2',
    avatar:'',
    updateDate: new Date(),
  },
  {
    id:'3',
    username:'Test Test 3',
    avatar:'',
    updateDate: new Date(),
  },
  {
    id:'4',
    username:'Test Test 4',
    avatar:'',
    updateDate: new Date(),
  },
  {
    id:'5',
    username:'Test Test 5',
    avatar:'',
    updateDate: new Date(),
  },
];

const ViewAuction = () => {
  const [form] = useForm();
  const { auction, error } = useAuction();
  const [ellipsis] = useState(true);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if(JSON.stringify(auction) === '{}') return;

    const tempFiles = [];
    const {
      title,
      description,
      initialRate,
      stepRate,
      rangeDate,
      images,
    } = auction;

    form.setFieldsValue({
      title,
      description,
      initialRate,
      stepRate,
      startDate: rangeDate[0],
      endDate: rangeDate[1],
    });

    if(images) {
      images.forEach(src => tempFiles.push({ type:'image', src }));
    }
    //
    // if(video) {
    //   tempFiles.push({ type:'video', src: parseFile(video) });
    // }
    setFiles(tempFiles);
  }, [auction]);

  const onFinish = values => {
    console.log(values);
    console.log(error);
  };

  return (
    <Form
      name="view"
      layout="vertical"
      form={form}
      autoComplete="off"
      onFinish={onFinish}
      aria-autocomplete="none"
      className="view"
    >
      <Form.Item
        name="title"
      >
        <h2 className="view--title">{form.getFieldValue('title')}</h2>
      </Form.Item>
      <Carousel
        autoplay
        className="view--carousel"
      >
        {
          files.length > 0
          ? files.map((item, index) => (
            <div key={index}>
              {
                item.type === 'image'
                  ? <img src={item.src || 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'} className="view--carousel-img" alt=" "/>
                  : null
                  // : <video>
                  //   <source src={ item.src || '' } type='video/mp4'/>
                  // </video>
              }
            </div>
          ))
          : null
        }
      </Carousel>
      <div>
        <h2>Description</h2>
        <Paragraph
          ellipsis={
            ellipsis
              ? {
                rows: 2,
                expandable: true,
                symbol: 'more',
              }
              : false
          }
        >
          Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
          Design, a design language for background applications, is refined by Ant UED Team. Ant
          Design, a design language for background applications, is refined by Ant UED Team. Ant
          Design, a design language for background applications, is refined by Ant UED Team. Ant
          Design, a design language for background applications, is refined by Ant UED Team. Ant
          Design, a design language for background applications, is refined by Ant UED Team.
        </Paragraph>
      </div>

      <div className="view--content">
        <div className="view--content--info">
          <Form.Item
            name="startDate"
            label="Start auction:"
          >
            <DatePicker format={dateFormat} disabled />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="Finish auction:"
          >
            <DatePicker format={dateFormat} disabled />
          </Form.Item>
          <Form.Item
            name="initialRate"
            label="Current rate:"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="stepRate"
            label="Step rate:"
          >
            <Input disabled />
          </Form.Item>
        </div>
        <div className="view--content--actions">
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
            >
              Participate
            </Button>
          </Form.Item>
          {
            !users
              ? null
              : <ul>
                {
                  users.map(user => (
                    <UserAction
                      id={user.id}
                      key={user.id}
                      avatar={user.avatar}
                      username={user.username}
                      stepRate={form.getFieldValue('stepRate')}
                      updateDate={user.updateDate} />
                  ))
                }
              </ul>
          }
        </div>
      </div>
    </Form>
  );
};

export default ViewAuction;
