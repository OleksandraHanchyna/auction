import React, { useEffect, useState } from 'react';
import {
  Form,
  Button,
  Input,
  DatePicker,
  Select,
  Upload,
  Image,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { validationUsername } from '../../utils/validationUtils';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Profile.scss';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const Profile = () => {
  const [form] = Form.useForm();
  const [fileList] = useState([]);
  const [imgSrc, setImgSrc] = useState('');
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  const setUploadStatus = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  // const memoizedLoadImg = useMemo(async() => {
  //   await getBase64(fileList[0]);
  // }, [fileList[0]]);

  useEffect(() => {
    form.setFieldsValue({
      username: user.name,
      email: user.email,
    });
  }, [user]);

  const onFinish = values => {
    console.log('values', values);
    navigate('/');
  };

  const handleChange = async({ fileList: newFileList }) => {
    console.log('newFileList', newFileList);
    // let fList = [...newFileList];
    // if(fList.length > 1) {
    //   fList = new Array(fList.slice(-1));
    // }
    // setFileList(fList);
    // console.log('fList', fList);
    // if(fList.length === 0) {
    //   return;
    // }
    //
    // const file = fList[0];
    const file = newFileList[newFileList.length -1];
    if (!file.url && !file.preview) {
      //memoizedLoadImg
      file.preview = await getBase64(file.originFileObj);
    }
    // console.log('file.url', file.url);
    // console.log('file.preview', file.preview);
    setImgSrc(file.preview); //file.url
  };

  return (
    <Form
      className="profile"
      layout="vertical"
      form={form}
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item>
        {/*<ImgCrop rotate shape="round">*/}
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            customRequest={setUploadStatus}
          >
            {
              imgSrc.length > 0
                ? <Image
                  name="avatar"
                  className="profile-img"
                  src={imgSrc}
                  preview={{
                    visible: false,
                    mask: (
                      <div className="ant-image-mask">
                        <div className="ant-image-mask-info">
                          <UploadOutlined/>
                          Change
                        </div>
                      </div>
                    ),
                  }}
                />
                : <div>
                  <UploadOutlined/>
                </div>
            }
          </Upload>
        {/*</ImgCrop>*/}
      </Form.Item>
      <Form.Item
        name="username"
        label="Username"
        validateTrigger='onSubmit'
        rules={[
          {
            required: true,
            message: 'Please enter Username.',
          },
          {
            message: '4 to 20 characters. Must begin with letter. Letter, number, underscores, hyphens are allowed.',
            validator: (_, value) => {
              return validationUsername(value);
            },
          },
        ]}
      >
        <Input placeholder="Type your name"/>
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
      >
        <Input disabled />
      </Form.Item>
      <Form.Item name="gender" label="Gender">
        <Select placeholder="Select gender">
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="dateBirth" label="Date of Birth">
        <DatePicker picker="date" placeholder="Choose date of birth"/>
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          className="profile-save-btn"
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Profile;
