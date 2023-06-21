import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Drawer,
  Image,
  Card,
  message,
  Button,
  Input,
  Form,
  Tooltip,
} from "antd";
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";
import axios from "axios";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./utils";
import {
  CreditCardOutlined,
  CalendarOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { formatPhoneNumber } from "helper/Formula";
import { useAuth } from "contexts/AuthContext";

const BillingDrawer = (props) => {
  let size = 500;
  const { currentUser } = useAuth();

  let data = {
    cardNumber: "",
    cardHolder: "",
    validThru: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  };

  const {
    setPaymentMethod,
    visible,
    close,
    paymentType,
    setDrawer,
    generateToken,
    info,
  } = props;

  const [form] = Form.useForm();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  // Card State
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [validThru, setValidThru] = useState("");
  const [issuer, setIssuer] = useState("");
  const [cvc, setCvc] = useState("");

  // Toogle Front & Back
  const [isFrontOfCardVisible, setIsFrontOfCardVisible] = useState(true);

  const [onSubmitReset, setOnSubmitReset] = useState(false);

  if (width > 1400) {
    size = 600;
  } else if (width > 1024) {
    size = 550;
  } else if (width >= 550) {
    size = 550;
  } else if (width >= 425) {
    size = width;
  } else {
    size = width;
  }
  const toggleCardFlip = () => {
    setIsFrontOfCardVisible(!isFrontOfCardVisible);
  };

  const onHandleData = (type, value) => {
    setIsFrontOfCardVisible(true);

    if (type == "card") {
      data.cardNumber = value;
      setCardNumber(formatCreditCardNumber(value));
      form.setFieldsValue({ cardNumber: formatCreditCardNumber(value) });
      setIsFrontOfCardVisible(true);
    }
    if (type == "card-gcash") {
      data.cardNumber = value;
      setCardNumber(formatPhoneNumber(value));
      form.setFieldsValue({ cardNumber: formatPhoneNumber(value) });
      setIsFrontOfCardVisible(true);
    }
    if (type == "holder") {
      data.cardHolder = value;
      setCardHolder(value);
      form.setFieldsValue({ cardHolder: value });
      setIsFrontOfCardVisible(true);
    }
    if (type == "thru") {
      data.validThru = value;
      setValidThru(formatExpirationDate(value));
      form.setFieldsValue({ validThru: formatExpirationDate(value) });

      setIsFrontOfCardVisible(true);
    }
    if (type == "cvc") {
      data.cvc = value;
      setCvc(formatCVC(value));
      form.setFieldsValue({ cvc: formatCVC(value) });
      setIsFrontOfCardVisible(false);
    }
  };
  const handleCallback = ({ issuer }, _) => {
    setIssuer(issuer);
  };
  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  const onFinish = async (values) => {
    try {
      setLoading(true);
      if (issuer == "unknown") {
        message.warning("Credit Card is Unknown");
      } else {
        values.issuer = issuer;
        const finalData = {
          card_number: values.cardNumber,
          card_holder: values.cardHolder,
          issuer: values.issuer,
          valid_thru: values.validThru,
          cvc: values.cvc,
          active_card: false,
          info: info,
          email: currentUser?.email,
        };

        const billingData = await axios.post(
          "/api/app/user/billing/create",
          finalData,
          generateToken
        );
        console.log(billingData);
        setPaymentMethod(billingData.data);
        setCardNumber("");
        setCardHolder("");
        setValidThru("");
        setIssuer("");
        setCvc("");
        setPaymentMethod({});
        submitForm();
        setOnSubmitReset(!onSubmitReset);
        setDrawer(false);
        setLoading(false);
      }
    } catch (error) {
      message.error(error.message);
      setLoading(false);
    }
  };
  const onFinishGcash = async (values) => {
    setLoading(true);
    values.issuer = "GCash";
    values.validThru = "N/A";
    values.cvc = "N/A";
    const finalData = {
      card_number: values.cardNumber,
      card_holder: values.cardHolder,
      issuer: values.issuer,
      valid_thru: values.validThru,
      cvc: values.cvc,
      info: info,
      active_card: false,
    };
    await axios
      .post("/api/app/user/billing/create", finalData, generateToken)
      .then((response) => {
        setPaymentMethod(response);
        setCardNumber("");
        setCardHolder("");
        setValidThru("");
        setIssuer("");
        setCvc("");
        setPaymentMethod({});
        submitForm();
        setDrawer(false);
        setLoading(false);
      })
      .catch((error) => {
        message.error(error.message);
        setLoading(false);
      });
  };

  const submitForm = () => {
    form.resetFields();
  };
  useEffect(
    () => {
      const listener = window.addEventListener(
        "resize",
        updateWindowDimensions
      );
      updateWindowDimensions();

      return () => {
        listener, setHeight(), setWidth();
      };
    },
    [height],
    [width]
  );
  // useEffect(() => {
  //   form.resetFields();
  // }),
  //   [];
  // Usage
  // functions

  return (
    <Drawer
      width={size}
      placement="right"
      onClose={close}
      visible={visible}
      title="Billing Info"
      className="custom-ant-header"
    >
      <Row
        style={{
          height: "100%",
          minHeight: "95%",
          display: "flex",
          width: "100%",
        }}
        justify="center"
      >
        {" "}
        {paymentType == "credit" ? (
          <Col xs={22} sm={22} md={22} lg={22} xl={22} justify="center">
            <Card className="mt-2 setting-content">
              <Form form={form} onFinish={onFinish} name="basicInformation">
                <div className="mb-3 cursor-pointer" onClick={toggleCardFlip}>
                  <Cards
                    number={cardNumber}
                    name={cardHolder}
                    expiry={validThru}
                    cvc={cvc}
                    focused={isFrontOfCardVisible ? "number" : "cvc"}
                    callback={handleCallback}
                  />
                </div>
                <Row gutter={14}>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item
                      name="cardNumber"
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp(/^[\d| ]{16,22}$/),
                          message: "Please enter a valid card!",
                          whitespace: true,
                        },
                      ]}
                      hasFeedback
                    >
                      <Input
                        //  className="display-content" "([a-zA-Z]{3,30}\\s*)+""
                        suffix={<CreditCardOutlined />}
                        //value={cardNumber}
                        onChange={(e) => onHandleData("card", e.target.value)}
                        placeholder="Card Number"
                        maxLength={22}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item
                      name="cardHolder"
                      hasFeedback
                      onChange={(e) => onHandleData("holder", e.target.value)}
                    >
                      <Input
                        suffix={<CreditCardOutlined />}
                        placeholder="Card Holder Name"
                        maxLength={35}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      name="validThru"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp(/^\d{2}\/\d{2}$/),
                          message: "Please enter a valid Thru!",
                        },
                      ]}
                    >
                      <Input
                        suffix={<CalendarOutlined />}
                        placeholder="12/12"
                        onChange={(e) => onHandleData("thru", e.target.value)}
                        maxLength={5}
                        value={validThru}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      name="cvc"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp(/^\d{3}$/),
                          message: "Please enter a valid CVC!",
                        },
                      ]}
                    >
                      <Input
                        maxLength={3}
                        suffix={
                          <Tooltip title="The last three digits printed on the back of the card">
                            <QuestionCircleOutlined className="cursor-pointer" />
                          </Tooltip>
                        }
                        placeholder="CVC"
                        onChange={(e) => onHandleData("cvc", e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    justify={"center"}
                    className="text-center "
                  >
                    <Button loading={loading} htmlType="submit" type="primary">
                      Add Credit/Debit Card
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        ) : (
          <>
            <Col xs={22} sm={22} md={22} lg={22} xl={22} justify="center">
              <Card className="mt-2 setting-content">
                <Form
                  onFinish={onFinishGcash}
                  form={form}
                  name="basicInformation"
                >
                  <div className="mb-3">
                    <Image
                      style={{ marginBottom: "-40px", marginTop: "-20px" }}
                      preview={false}
                      src="/img/others/cards/GCash-Logo.png"
                    />
                  </div>
                  <Row gutter={14}>
                    <Col xs={24} sm={24} md={24}>
                      <Form.Item
                        name="cardNumber"
                        rules={[
                          {
                            required: true,
                            pattern: new RegExp(
                              /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
                            ),
                            message: "Please enter a gcash number!",
                            whitespace: true,
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          suffix={<CreditCardOutlined />}
                          //  className="display-content" "([a-zA-Z]{3,30}\\s*)+""
                          onChange={(e) =>
                            onHandleData("card-gcash", e.target.value)
                          }
                          placeholder="(xxx) xxx-xxxx"
                          maxLength={15}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                      <Form.Item
                        name="cardHolder"
                        hasFeedback
                        rules={[
                          {
                            required: true,

                            message: "Please enter a name!",
                          },
                        ]}
                        onChange={(e) => onHandleData("holder", e.target.value)}
                      >
                        <Input
                          suffix={<CreditCardOutlined />}
                          placeholder="Phone Number Name"
                          maxLength={35}
                        />
                      </Form.Item>
                    </Col>

                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      justify={"center"}
                      className="text-center "
                    >
                      <Button
                        loading={loading}
                        htmlType="submit"
                        type="primary"
                      >
                        Add Phone Number
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Drawer>
  );
};

export default React.memo(BillingDrawer);
