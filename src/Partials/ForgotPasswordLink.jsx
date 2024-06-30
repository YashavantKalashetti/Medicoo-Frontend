import React, { useState } from 'react';
import { Modal, Typography, Row, Col, Card, Form, Input, Button, message } from 'antd';
import { UserOutlined, MedicineBoxOutlined, BankOutlined, MailOutlined } from '@ant-design/icons';

const { Text, Link } = Typography;

const ForgotPasswordLink = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accountType, setAccountType] = useState(null);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAccountTypeSelection = (type) => {
    setAccountType(type);
  };

  const handleSubmit = (values) => {
    console.log('Submitted values:', { accountType, email: values.email });
    
    setTimeout(() => {
        message.success(`Password reset link sent to ${values.email}`);
        setIsModalVisible(false);
        form.resetFields();
        setAccountType(null);
    },1000);
    
  };

  const accountTypes = [
    { type: 'patient', icon: <UserOutlined />, title: 'Patient', color: '#52c41a' },
    { type: 'doctor', icon: <MedicineBoxOutlined />, title: 'Doctor', color: '#722ed1' },
    { type: 'hospital', icon: <BankOutlined />, title: 'Hospital', color: '#fa8c16' }
  ];

  return (
    <>
      <Link onClick={showModal}>Forgot Password</Link>

      <Modal
        title={<Text strong style={{ fontSize: '20px' }}>Reset {accountType ? accountType.charAt(0).toUpperCase() + accountType.slice(1).toLowerCase() : ""} Password</Text>}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setAccountType(null);
          form.resetFields();
        }}
        footer={null}
        centered
        width={600}
      >
        {!accountType ? (
          <>
            <Text style={{ display: 'block', marginBottom: '16px' }}>Select your account type:</Text>
            <Row gutter={[16, 16]}>
              {accountTypes.map(({ type, icon, title, color }) => (
                <Col span={8} key={type}>
                  <Card
                    hoverable
                    style={{ textAlign: 'center', height: '100%' }}
                    bodyStyle={{ padding: '24px 12px' }}
                    onClick={() => handleAccountTypeSelection(type)}
                  >
                    {React.cloneElement(icon, { style: { fontSize: '48px', color: color } })}
                    <Text strong style={{ display: 'block', marginTop: '12px', fontSize: '16px' }}>
                      {title}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Enter your email" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Send Reset Link
              </Button>
            </Form.Item>
            <Button type="link" onClick={() => setAccountType(null)} block>
              Back to Account Selection
            </Button>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default ForgotPasswordLink;