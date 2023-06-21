import React, { useState } from "react";
import {
  Typography,
  Col,
  Card,
  Avatar,
  Button,
  Menu,
  Dropdown,
  Row,
  Carousel,
  Modal,
} from "antd";
import {
  EllipsisOutlined,
  DeleteOutlined,
  CloudDownloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import ShowMoreText from "react-show-more-text";
import moment from "moment";
import PDFTemplate from "components/shared-components/Documents";
import Rejected from "assets/file/rejected.pdf";
import Pending from "assets/file/pending.pdf";
import draftToHtmlPuri from "draftjs-to-html";
import { convertFromRaw, EditorState, convertToRaw } from "draft-js";
import { useHistory } from "react-router-dom";
import { toCapitalized } from "helper/Formula";
import utils from "utils";
import { saveAs } from "file-saver";
import CommentSection from "components/shared-components/CommentSection";
import PaymentSection from "../PaymentSection";

const { Text } = Typography;
const { Title } = Typography;

const DocumentStatus = (props) => {
  const {
    title,
    type,
    img,
    content,
    margin,
    classData,
    createdAt,
    orgName,
    attachFile,
    subTitle,
    certificate_requests_id,
    organization_id,
    deleteDocumetRequest,
  } = props;
  const history = useHistory()

  const contentData = {
    entityMap: {},
    blocks: content != null ? content.blocks : [],
  };
  const contentDataValidate = {
    entityMap: {},
    blocks: [],
  };
  const contentStateValidate = convertFromRaw(contentDataValidate);
  const editorStateValidate = EditorState.createWithContent(
    contentStateValidate
  );
  const htmlPuriValidate = draftToHtmlPuri(
    convertToRaw(editorStateValidate.getCurrentContent())
  );
  const contentState = convertFromRaw(contentData);
  const editorState = EditorState.createWithContent(contentState);
  const htmlPuri = draftToHtmlPuri(
    convertToRaw(editorState.getCurrentContent())
  );
  const htmlFinal =
    htmlPuri === htmlPuriValidate
      ? "<p>Please wait for the approval or instruction on this dialouge</p>"
      : htmlPuri;
  const color = ["#E1F8DC", "#FEF8DD", "#FFE7C7", "#B7E9F7", "#ADF7B6"];
  let colorTag = [
    "#0085c3",
    "#7ab800",
    "#f2af00",
    "#dc5034",
    "#ce1126",
    "#0085c3",
    "#FF1493",
    "#AA47BC",
  ];
  const randomColor = Math.floor(Math.random() * color.length);
  const randomColorTag = Math.floor(Math.random() * colorTag.length);

  const handleClick = (e) => {
    if (e.key == 1) {
      console.log("cert " + certificate_requests_id, "org " + organization_id);

      Modal.confirm({
        title: "Confirm",
        icon: <ExclamationCircleOutlined />,
        content: "Are you sure you want to delete?",
        okText: "Delete",
        cancelText: "Cancel",
        centered: true,
        onOk: showModal,
      });
    }
    if (e.key == 2)
      attachFile.map((item) => {
        saveAs(item.url, item.name);
      });
  };
  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="1">
        <a to={`#`}>
          {" "}
          <DeleteOutlined /> <span className="ml-2">Delete</span>{" "}
        </a>
      </Menu.Item>

      <Menu.Item key={2}>
        <a to={`#`}>
          <CloudDownloadOutlined /> <span className="ml-2">Download </span>
        </a>
      </Menu.Item>
    </Menu>
  );
  const showModal = () => {
    deleteDocumetRequest(certificate_requests_id, organization_id);
  };

  const DropdownMenu = () => (
    <Dropdown key="more" overlay={menu} trigger={["click"]} autoFocus={true}>
      <Button
        style={{
          border: "none",
          padding: 0,
        }}
      >
        <EllipsisOutlined
          style={{
            fontSize: 20,
            verticalAlign: "top",
          }}
        />
      </Button>
    </Dropdown>
  );

  return (
    <>
      <Card
        style={{ margin: margin }}
        title={
          <>
            <div className="d-flex">
              {img != null ? (
                <Avatar
                  className="font-size-sm custom-hover-pointer"
                  src={img}
                  shape="circle"
                  style={{ backgroundColor: colorTag[randomColorTag] }}
                  onClick={() => history.push(`/home/organization/${organization_id}`)}
                >
                  {utils.getNameInitial(orgName)}
                </Avatar>
              ) : (
                <Avatar
                  className="font-size-sm custom-hover-pointer"
                  style={{ backgroundColor: colorTag[randomColorTag] }}
                  shape="circle"
                  onClick={() => history.push(`/home/organization/${organization_id}`)}
                >
                  {utils.getNameInitial(orgName)}
                </Avatar>
              )}
              {/* <Avatar
                style={{ backgroundColor: color }}
                size={50}
                src={img}
                shape="circle"
              ></Avatar> */}

              <div>
                <div className="ml-1">
                  {/* <Text type="Primary">{moment(createdAt).format("LL")} </Text> */}
                  <Text
                    type="Primary"
                    className="custom-text-hover-pointer"
                    onClick={() => history.push(`/home/organization/${organization_id}`)}
                  >
                    {orgName}
                  </Text>
                </div>
                <div className="ml-1" type="Primary">
                  <Title
                    level={5}
                    style={{
                      color: "rgb(69, 85, 96) !important",
                      marginTop: -5,
                    }}
                    className="custom-text-hover-pointer"
                    onClick={() => history.push(`/home/organization/${organization_id}`)}
                  >
                    {moment(createdAt).format("LL")}
                  </Title>
                </div>
              </div>
            </div>
          </>
        }
        className={`${classData}`}
        extra={<DropdownMenu />}
      >
        <div style={{ background: color[randomColor], borderRadius: "1rem" }}>
          {type === "pending" ? (
            <>
              <Row>
                <Col>
                  <Carousel className="content-border-card">
                    <PDFTemplate
                      data={0}
                      certType="cert"
                      templateType="simple"
                      min={4}
                      max={9}
                      pdf={Pending}
                      type={"create"}
                    />
                  </Carousel>
                </Col>
              </Row>
            </>
          ) : type === "rejected" ? (
            <>
              <Row>
                <Col>
                  <Carousel className="content-border-card">
                    <PDFTemplate
                      data={0}
                      certType="cert"
                      templateType="simple"
                      min={4}
                      max={9}
                      pdf={Rejected}
                      type={"create"}
                    />
                  </Carousel>
                </Col>
              </Row>
            </>
          ) : (
            <>
              {attachFile.length > 0 ? (
                <>
                  <Row>
                    <Col>
                      <Carousel autoplay className="content-border-card">
                        {attachFile.map((item, i) => {
                          return (
                            <div key={i}>
                              <PDFTemplate
                                data={0}
                                certType="cert"
                                templateType="simple"
                                min={4}
                                max={9}
                                pdf={item?.url}
                                type={"create"}
                              />
                            </div>
                          );
                        })}
                      </Carousel>
                    </Col>
                  </Row>
                </>
              ) : null}
            </>
          )}

          {/* <img
            width="100%"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            style={{ borderRadius: "1rem 1rem 0 0" }}
          /> */}
          <div className="content-body-card ">
            <h2>
              <ShowMoreText
                /* Default options */
                lines={1}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="my-anchor-css-className"
                expanded={false}
                truncatedEndingComponent={"... "}
              >
                <strong>{toCapitalized(title)}</strong>
              </ShowMoreText>
            </h2>
            <h4 className="text-muted">{toCapitalized(subTitle)}</h4>

            <h4>
              <div>
                <ShowMoreText
                  /* Default options */
                  lines={1}
                  more="expand"
                  className="content-css half-black"
                  less="collapse"
                  anchorClass="my-anchor-css-className"
                  expanded={false}
                  truncatedEndingComponent={"... "}
                >
                  {/* {content} */}
                  <div className="">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: htmlFinal,
                      }}
                    />
                  </div>
                </ShowMoreText>
              </div>
            </h4>
          </div>
        </div>{" "}
        <div className="mt-2 text-right align-items-center">
          {subTitle === "walk in" ? null : (
            <PaymentSection organization_id={organization_id} />
          )}
        </div>
        <div className="mt-3">
          <>
            <hr className="hr-style" />
            <CommentSection
              generalId={certificate_requests_id}
              orgId={organization_id}
            />
          </>
        </div>
      </Card>
    </>
  );
};
DocumentStatus.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  img: PropTypes.string,
  content: PropTypes.object,
  padding: PropTypes.string,
  margin: PropTypes.string,
  classData: PropTypes.string,
  isVisit: PropTypes.bool,
  enableVisit: PropTypes.bool,
  enablePost: PropTypes.bool,
  href: PropTypes.string,
  attachFile: PropTypes.array,
  subTitle: PropTypes.string,
  certificate_request_id: PropTypes.string,
  organization_id: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  deleteDocumetRequest: PropTypes.elementType,
};

DocumentStatus.defaultProps = {
  certificate_request_id: " ",
  organization_id: " ",
  subTitle: " ",
  padding: "5",
  title: "",
  type: "",
  img: "",
  content: { blocks: [] },
  margin: "5px 5px",
  isVisit: true,
  enableVisit: true,
  enablePost: false,
  classData: "",
  href: "",
  attachFile: [],
  createdAt: moment().format(`LL`),
};
export default DocumentStatus;
