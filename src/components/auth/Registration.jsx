import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Input, Checkbox } from 'antd';
import { validationEmail, validationPassword, validationUsername } from '../../utils/validationUtils';
import { Link, useNavigate } from 'react-router-dom';
import { registry } from '../../store/AuthReducer';
import { formValidation, onFormFinish } from '../../utils/formUtils';

const Registration = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async values => {
    const { username, email, password, confirmPassword } = values;
    const errors = await dispatch(registry({
      username,
      email,
      password,
      passwordConfirm: confirmPassword,
    }));

    if(errors) {
      formValidation(form, errors);
    }

    onFormFinish(form, () => navigate('/'));
  };

  return (
    <Form
      layout="vertical"
      form={form}
      autoComplete="off"
      onFinish={onFinish}
      aria-autocomplete="none"
      className="registration"
    >
      <h2>Registration</h2>
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
        validateTrigger='onSubmit'
        rules={[
          {
            required: true,
            message: 'Please enter Email.',
          },
          {
            message: '8 to 25 characters. Must begin with letter. Letter, number, underscores, hyphens are allowed.',
            validator: (_, value) => {
              return validationEmail(value);
            },
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
          {
            message: 'Error Password.',
            validator: (_, value) => {
              return validationPassword(value);
            },
          },
        ]}
      >
        <Input.Password placeholder="Type your password"/>
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        validateTrigger='onSubmit'
        rules={[
          {
            required: true,
            message: 'Please enter Confirm Password.',
          },
          {
            message: 'Must match the first password input field.',
            validator: (_, value) => {
              const pwdValue = form.getFieldValue('password');
              return (!value && !pwdValue) || pwdValue === value ? Promise.resolve() : Promise.reject('Error');
            },
          },
        ]}
      >
        <Input.Password placeholder="Confirm your password"/>
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        validateTrigger='onSubmit'
        className="agreement"
        rules={[
          {
            message: 'Please agree to out Terms and Conditions',
            validator: (_, checked) => {
              return checked ? Promise.resolve() : Promise.reject('Error');
            },
          },
        ]}
      >
        <Checkbox>
          Agree to out <a>Terms and Conditions</a>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          className="auth-btn"
        >
          Sign Up
        </Button>
      </Form.Item>
      <p>
        Already registered?&nbsp;
        <Link to="/auth">Sign In</Link>
      </p>
    </Form>
  );
};
export default Registration;
