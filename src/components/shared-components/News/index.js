import React from "react";
import { Typography, Col, Avatar, Card, Button, Space } from "antd";
import { HeartOutlined, MessageOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ShowMoreText from "react-show-more-text";
import CommentSection from "components/shared-components/CommentSection";
const { Text } = Typography;

const News = (props) => {
  const {
    title,
    type,
    img,
    content,
    margin,
    isVisit,
    classData,
    enableVisit,
    enablePost,
    href,
  } = props;
  const color = ["#E1F8DC", "#FEF8DD", "#FFE7C7", "#B7E9F7", "#ADF7B6"];
  const randomColor = Math.floor(Math.random() * color.length);

  return (
    <>
      <Card
        style={{ margin: margin }}
        title={
          <>
            <Text type="secondary">Picked for you in</Text>
            <br></br>
            <Text mark>{type}</Text>
          </>
        }
        className={`${classData}`}
        extra={<Avatar src={img} shape="circle"></Avatar>}
      >
        <div style={{ background: color[randomColor], borderRadius: "1rem" }}>
          <img
            width="100%"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            style={{ borderRadius: "1rem 1rem 0 0" }}
          />
          <div style={{ padding: "1rem" }}>
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
                <strong>{title}</strong>
              </ShowMoreText>
            </h2>
            <h4 className="text-muted">Morong, Rizal</h4>
            <h4>
              <ShowMoreText
                /* Default options */
                lines={3}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="my-anchor-css-className"
                expanded={false}
                truncatedEndingComponent={"... "}
              >
                {content}{" "}
              </ShowMoreText>
            </h4>
          </div>
        </div>{" "}
        {isVisit ? (
          <div className="mt-3">
            <div className="mb-4 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Space>
                  <HeartOutlined
                    style={{
                      fontSize: "1.8rem",
                      color: "#3e79f7",
                      cursor: "pointer",
                    }}
                  />
                  <p style={{ color: "#3e79f7" }}>72</p>
                  <MessageOutlined
                    style={{
                      fontSize: "1.8rem",
                      color: "#3e79f7",
                      cursor: "pointer",
                    }}
                  />
                  <p style={{ color: "#3e79f7" }}>8</p>
                </Space>
              </div>
              <div>
                {enableVisit ? (
                  <Link to={href}>
                    <Button type="primary" shape="round">
                      Visit
                    </Button>
                  </Link>
                ) : null}
              </div>
            </div>
            {/*  */}
            {/* <div>
              <div className="halfDiv">
                <div className="userInfo">  {" "}v
                  <div className="commentsTwo">
                    <a
                      className="userLink"
                      target="_blank"
                      href="https://www.linkedin.com/in/riya-negi-8879631a9/"
                    >
                      <div>
                        <img
                          src="https://ui-avatars.com/api/name=Riya&amp;background=random"
                          alt="userIcon"
                          className="imgdefault"
                          style={{ position: "relative", top: "7px;" }}
                        />
                      </div>
                      <div className="fullName">Riya Negi </div>
                    </a>
                  </div>
                  <div className="infoStyle">Hey, Loved your blog! </div>
                  <div style={{ marginLeft: "32px;" }}>
                    <div>
                      <button className="replyBtn">
                        <div className="replyIcon"></div>
                        <span style={{ marginLeft: "17px" }}>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="userActions">
                  <button className="actionsBtn">
                    <div className="optionIcon"></div>
                  </button>
                  <div
                    className="szh-menu-container"
                    style={{ position: "relative;" }}
                  ></div>
                </div>
              </div>
            </div> */}
            {enablePost ? (
              <>
                <hr className="hr-style" />
                <CommentSection />
              </>
            ) : null}
          </div>
        ) : null}
      </Card>
    </>
  );
};
News.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  img: PropTypes.string,
  content: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  classData: PropTypes.string,
  isVisit: PropTypes.bool,
  enableVisit: PropTypes.bool,
  enablePost: PropTypes.bool,
  href: PropTypes.string,
};

News.defaultProps = {
  padding: "5",
  title: "",
  type: "",
  img: "",
  content: "",
  margin: "5px 5px",
  isVisit: true,
  enableVisit: true,
  enablePost: false,
  classData: "",
  href: "",
};
export default News;
