import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Form, Input, InputNumber, Row, Select, Slider, Upload, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { formValidation, onFormFinish } from '../../../utils/formUtils';
import { dateFormat, minStepRate, maxStepRate } from '../../../static/variables';
import dayjs from 'dayjs';
import './AuctionItem.scss';
import { useAuction } from '../../../hook/useAuction';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AuctionItem = () => {
  const [form] = Form.useForm();
  const { auction, createAuction, error } = useAuction();
  const [fileList, setFileList] = useState([]);
  const [step, setStep] = useState(0);
  const [isNewAuction, setIsNewAuction] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const currency = [
    { key:'USD', value: '$' },
    { key:'EUR', value: '€' },
    { key:'GBP', value: '£' },
    { key:'CNY', value: '¥' },
  ];

  useEffect(() => {
    const { id } = params;
    setIsNewAuction(id === 'new');
  },[]);

  useEffect(() => {
    const {
      title,
      description,
      initialRate,
      stepRate,
      rangeDate,
    } = auction;

    form.setFieldsValue({
      title,
      description,
      initialRate,
      rangeDate,
    });
    setStep(stepRate);
  }, [auction]);

  const setUploadStatus = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const onStepChange = value => {
    if (!isNaN(value)) {
      setStep(value);
    }
  };

  const handleUpload = newFileList => setFileList(newFileList);

  const onFinish = async values => {
    let video;
    const images = [];
    const formData = new FormData();
    const {
      title,
      description,
      initialRate,
      stepRate,
      rangeDate,
    } = values;

    if(fileList.fileList) {
      fileList.fileList.forEach(file => {
        if (file.type === 'video/mp4') {
          video = file.originFileObj;
        } else if (file.type === 'image/png') {
          images.push(file.originFileObj);
        } else {
          console.log('file type ERROR', file);
        }
      });

    }

    formData.append('title', title);
    formData.append('description', description);
    formData.append('startPrice', initialRate);
    formData.append('step', stepRate);
    formData.append('startDate', dayjs(rangeDate[0]).format(dateFormat));
    formData.append('endDate', dayjs(rangeDate[1]).format(dateFormat));
    formData.append('video', video);
    images.forEach(image => formData.append('images', image));

    await createAuction(formData);
    //const error = await addAuctionItem(formData);
    if(error) {
      formValidation(form, error);
      return;
    }
    onFormFinish(form, () => navigate('/'));
  };

  return (
    <Form
      className="auction"
      layout="vertical"
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      aria-autocomplete="none"
    >
      <h2>{isNewAuction ? 'Create' : 'Edit'} auction</h2>
      <Form.Item
        name="title"
        label="Title"
        validateTrigger='onSubmit'
        rules={[
          {
            required: true,
            message: 'Please enter Title.',
          },
        ]}
      >
        <Input placeholder="Enter Title"/>
      </Form.Item>
      <Form.Item
        name="initialRate"
        label="Initial rate"
      >
        <InputNumber
          addonAfter={
            <Select defaultValue={currency[0].key}>
              {
                currency.map((item, index) => (
                <Option
                  key={index}
                  value={item.key}
                >
                  {item.value}
                </Option>
              ))}
            </Select>
          }
        />
      </Form.Item>
      <Form.Item
        name="stepRate"
        label="Step rate"
        className="auction--step-rate"
      >
        <Row>
          <Col>
            <Slider
              min={minStepRate}
              max={maxStepRate}
              onChange={onStepChange}
              value={typeof step === 'number' ? step : 0}
            />
          </Col>
          <Col>
            <InputNumber
              min={minStepRate}
              max={maxStepRate}
              value={step}
              onChange={onStepChange}
            />
          </Col>
        </Row>
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="rangeDate"
      >
        <RangePicker
          showTime
          format={dateFormat}
        />
      </Form.Item>
      <Form.Item>
        <Upload
          name="file"
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          onChange={handleUpload}
          customRequest={setUploadStatus}
        >
          <Button icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item className="auction--btn">
        <Button
          block
          type="ghost"
          onClick={ () => navigate('/') }
        >
          Cancel
        </Button>
        <Button
          block
          type="primary"
          htmlType="submit"
        >
          {isNewAuction ? 'Create' : 'Edit'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AuctionItem;