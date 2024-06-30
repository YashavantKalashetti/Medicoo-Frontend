import React, { useState } from 'react';
import { Modal, Typography, Row, Col, Card } from 'antd';
import { UserOutlined, MedicineBoxOutlined, BankOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text, Link } = Typography;

const CreateAccountLink = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAccountTypeSelection = (type) => {
    setIsModalVisible(false);
    navigate(`/signup/${type}`);
  };

  const accountTypes = [
    { type: 'patient', icon: <UserOutlined />, title: 'Patient', color: '#52c41a' },
    { type: 'doctor', icon: <MedicineBoxOutlined />, title: 'Doctor', color: '#722ed1' },
    { type: 'hospital', icon: <BankOutlined />, title: 'Hospital', color: '#fa8c16' }
  ];

  return (
    <>
      <Link onClick={showModal}>Create Account</Link>

      <Modal
        title={<Text strong style={{ fontSize: '20px' }}>Choose Account Type</Text>}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        width={600}
      >
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
      </Modal>
    </>
  );
};

export default CreateAccountLink;