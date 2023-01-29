import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/AuthReducer';
import { formValidation, onFormFinish } from '../../utils/formUtils';

const Authorization = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async values => {
    const errors = await dispatch(login(values));
    if(errors) {
      formValidation(form, errors);
    }
    onFormFinish(form, () => navigate('/'));
  };

  return (
    <Form
      layout="vertical"
      form={ form }
      autoComplete="off"
      onFinish={ onFinish }
      aria-autocomplete="none"
      className="authorization"
    >
      <h2>Authorization</h2>
      <Form.Item
        name="email"
        label="Email"
        validateTrigger='onSubmit'
        rules={[
          {
            required: true,
            message: 'Please enter Email.',
          },
        ]}
      >
        <Input placeholder="Type your email"/>
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        validateTrigger='onSubmit'
        rules={[
          {
            required: true,
            message: 'Please enter Password.',
          },
        ]}
      >
        <Input.Password placeholder="Type your password" />
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          className="auth-btn"
        >Sign In</Button>
      </Form.Item>
      <p>
        Registered? &nbsp;
        <Link to="/reg">Sign Up</Link>
      </p>
    </Form>
  );
};

export default Authorization;
