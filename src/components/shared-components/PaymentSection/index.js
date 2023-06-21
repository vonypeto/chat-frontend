import React, { useState, useEffect } from "react";
import { Modal, Button, InputNumber, Card, Form, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import FormBillingInfo from "views/app-views/account/settings/Profile/billing/FormBillingInfo";
import { useAuth } from "contexts/AuthContext";
import { AUTH_TOKEN } from "redux/constants/Auth";
import BillingTable from "views/app-views/account/settings/Profile/billing/BillingTable";
import notification from "components/shared-components/Notification";

import axios from "axios";
const PaymentSection = (props) => {
  const data = { auth_id: localStorage.getItem(AUTH_TOKEN) };

  const { currentUser, generateToken } = useAuth();
  const { organization_id } = props;

  const [open, setOpen] = useState(false);
  const [parentData, setParentData] = useState({
    email: currentUser?.email,
    name: currentUser?.displayName,
    organizationId: organization_id,
    paymentData: 50,
  });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [modalWidth, setModalWidth] = useState(1000);

  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 1000) {
      setModalWidth(windowWidth);
    } else {
      setModalWidth(1000);
    }
  };

  let description = "Please fill up the form: ";
  let show = false;
  console.log(parentData);
  const BillingContent = () => {
    return (
      <>
        <FormBillingInfo
          {...data}
          type="request"
          parentData={parentData}
          setParentData={setParentData}
        />
        <BillingTable
          {...data}
          type="request"
          parentData={parentData}
          setParentData={setParentData}
        />{" "}
        <Card className="borderless">
          <Form initialValues={parentData.paymentData} layout="vertical">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Enter Amount",
                },
              ]}
              hasFeedback
              label="Amount"
              name="amount"
            >
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                max={100000}
                defaultValue={50}
                onChange={(e) => {
                  console.log(e);
                  let value = e;
                  let childData = parentData;
                  childData.paymentData = value;
                  setParentData(childData);
                }}
                placeholder="Enter Amount to Pay"
              />
            </Form.Item>
          </Form>
        </Card>
      </>
    );
  };
  const handleSendData = async () => {
    setConfirmLoading(true);

    try {
      // Certificate Request
      if (!parentData.email) {
        show = true;
        description += " email, ";
      }
      console.log(parentData.name);
      if (!parentData.name) {
        show = true;
        description += " name, ";
      }
      if (!parentData.paymentData && parentData.paymentData !== 0) {
        show = true;
        description += " amount, ";
      }

      if (!parentData.address) {
        show = true;
        description += " address, ";
      }

      if (!parentData.phoneNumber) {
        show = true;
        description += " phone number, ";
      }
      if (!parentData.postcode) {
        show = true;
        description += " postal code, ";
      }
      if (!parentData.city) {
        show = true;
        description += " city, ";
      }
      if (!parentData.country) {
        show = true;
        description += " country, ";
      }
      // if (!parentData.country) {
      //   show = true;
      //   description += " country, ";
      // }
      console.log(show);
      if (show) {
        notification({
          message: "Warning",
          description: description.slice(0, description.length - 2),
          duration: 10,
          type: "warning",
        });
        show = false;
        description = "Please fill up the form: ";
      } else {
        // Billing Information
        await axios
          .post(
            "/api/app/user/billing/document/intent",
            parentData,
            generateToken()[1]
          )
          .then((res) => {
            console.log(res.data);
            notification({
              message: "Success",
              description:
                "Request sent please wait for the instruction on your profile page",
              duration: 10,
              type: "success",
            });
            handleCancel();
            setConfirmLoading(false);
          })
          .catch((error) => {
            setConfirmLoading(false);
            return message.error(error.response.data);
          });
      }
    } catch (error) {
      setConfirmLoading(false);

      message.error(error.message);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const showModalPayment = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    console.log(parentData);
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  useEffect(() => {
    // Add event listener to resize modal width when window size changes
    window.addEventListener("resize", handleResize);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Button onClick={showModalPayment} type="primary">
        Pay Online
      </Button>

      <Modal
        title="Modal"
        visible={open}
        onOk={handleSendData}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
        confirmLoading={confirmLoading}
        width={modalWidth}
      >
        <div className="mt-2 mb-2 ml-2 mr-2">
          <BillingContent />
        </div>
      </Modal>
    </>
  );
};

export default PaymentSection;
