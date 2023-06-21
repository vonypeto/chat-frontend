import { React, useState, useEffect } from "react";
import {
  Typography,
  Col,
  Avatar,
  Card,
  Button,
  Space,
  Carousel,
  Image,
  Tooltip,
} from "antd";
import {
  HeartOutlined,
  MessageOutlined,
  EyeOutlined,
  HeartFilled,
  HeartTwoTone,
  TeamOutlined,
  FundViewOutlined
} from "@ant-design/icons";
import { BsPeopleFill, BsPeople } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import ShowMoreText from "react-show-more-text";
import CommentSection from "components/shared-components/CommentSection";
import CustomAvatar from "../CustomAvatar";
import { useAuth } from "contexts/AuthContext";
import moment from "moment";
import axios from "axios";
import utils from "utils";
import CustomDropdown from "../CustomDropdown";
import ModalCampaign from "./modal";

const { Text } = Typography;
const { Title } = Typography;

const CampaignCard = (props) => {
  const {
    title,
    category,
    orgName,
    orgId,
    orgProfile,
    startingDate,
    images,
    content,
    status,
    publisherName,
    suggestorName,
    suggestorEmail,
    userId,
    campaignStatus,
    campaignId,
    margin,
    isVisit,
    classData,
    enableVisit,
    enablePost,
    href,
    loading,
  } = props;

  //Initialize
  const history = useHistory();

  //for api
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const { generateToken, currentUser } = useAuth();

  //useState
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [likeStatus, setLikeStatus] = useState({
    likeCounter: campaignStatus.likeCounter,
    isLike: campaignStatus.isLike,
  });

  const [participantStatus, setParticipantStatus] = useState({
    participantCounter: campaignStatus.participantCounter,
    isParticipant: campaignStatus.isParticipant,
  });

  //axios
  const updateCampaignStatus = async (values, type, operation) => {
    console.log("values", values)
    if (type == "participant") {
      var newCampaignData = {
        participantCounter: values.participantCounter,
      };
    }

    if (type == "like") {
      var newCampaignData = {
        likeCounter: values.likeCounter,
      };
    }

    await axios
      .post(
        `/api/campaign/update-status`,
        { values: newCampaignData, operation, type, campaignId },
        generateToken()[1],
        { cancelToken }
      )
      .catch((error) => {
        throw error;
      });
  };

  const likeDecrement = async () => {
    var newStatus = {
      ...likeStatus,
      isLike: false,
      likeCounter: likeStatus.likeCounter - 1,
    };
    await updateCampaignStatus(newStatus, "like", "decrement");
    setLikeStatus(newStatus);
  };

  const likeIncrement = async () => {
    var newStatus = {
      ...likeStatus,
      isLike: true,
      likeCounter: likeStatus.likeCounter + 1,
    };
    await updateCampaignStatus(newStatus, "like", "increment");
    setLikeStatus(newStatus);
  };

  const participantDecrement = async () => {
    var newStatus = {
      ...participantStatus,
      isParticipant: false,
      participantCounter: participantStatus.participantCounter - 1,
    };
    await updateCampaignStatus(newStatus, "participant", "decrement");
    setParticipantStatus(newStatus);
  };

  const participantIncrement = async () => {
    var newStatus = {
      ...participantStatus,
      isParticipant: true,
      participantCounter: participantStatus.participantCounter + 1,
    };
    await updateCampaignStatus(newStatus, "participant", "increment");
    setParticipantStatus(newStatus);
  };

  const redirectToBarangay = () => {
    return history.push(`/home/organization/${orgId}`)
  }

  const redirectToCampaign = () => {
    if (href != "") {
      return history.push(href)
    }
    else {
      return history.push(`/home/posts/${orgId}/${campaignId}/single/data`)
    }
  }

  var menuItems = [
    {
      text: "View all images",
      icon: <EyeOutlined />,
      onClick: () => setVisible(true),
    },
    {
      text: "View Campaign Post",
      icon: <FundViewOutlined />,
      onClick: () => redirectToCampaign(),
    }
  ]

  const getColor = (category) => {
    switch (category) {
      case "Health":
        return "#E1F8DC";
      //light green
      case "Sport":
        return "#FEF8DD";
      //yellow
      case "Environment":
        return "#FFE7C7";
      //melon
      case "Technology":
        return "#B7E9F7";
      //blue
      case "Seminar":
        return "#ADF7B6";
      //green
      case "Event":
        return "#c6a7eb";
      case "Others":
        return "#f2aa8a";
      default:
      // code block
    }
  };

  return (
    <>
      <Card
        loading={loading}
        style={{ margin: margin }}
        title={
          <div className="d-flex">
            <CustomAvatar
              icon={utils.getNameInitial(orgName)}
              image={orgProfile.fileUrl}
              color="#003151"
              size={60}
              style={{ fontSize: 20 }}
              onClick={() => redirectToBarangay()}
              className="custom-hover-pointer"
            />

            <div>
              <div className="mt-2 ml-2">
                  <Text type="Primary" onClick={() => { redirectToBarangay() }} className="custom-text-hover-pointer">
                    {orgName}
                  </Text>
              </div>
              <div className="ml-1" type="Primary">
                <Text>
                  <div
                    style={{
                      color: "rgb(69, 85, 96) !important",
                      marginTop: -5,
                    }}
                    onClick={() => { redirectToCampaign() }}
                    className="custom-text-hover-pointer"
                  >
                    {moment(startingDate).format("LL")}
                  </div>
                </Text>
              </div>
            </div>
          </div> 
        }
        extra={<CustomDropdown menuItems={menuItems} />}
        className={`${classData}`}
      >
        <div
          className="custom-carousel-div"
          style={{ background: getColor(category), borderRadius: "1rem" }}
        >
          {images != null && (
            <>
              <Carousel adaptiveHeight autoplay draggable>
                {images.map((img, i) => {
                  return (
                    <img
                      key={i}
                      width="100%"
                      alt="picture"
                      src={img.data}
                      style={{ borderRadius: "1rem 1rem 0 0" }}
                    />
                  );
                })}
              </Carousel>

              <div style={{ display: "none" }}>
                <Image.PreviewGroup
                  preview={{
                    visible,
                    onVisibleChange: (vis) => setVisible(vis),
                  }}
                >
                  {images.map((img, i) => {
                    return (
                      <Image
                        key={i}
                        width="100%"
                        alt="picture"
                        src={img.data}
                        style={{ borderRadius: "1rem 1rem 0 0" }}
                      />
                    );
                  })}
                </Image.PreviewGroup>
              </div>
            </>
          )}

          <div style={{ padding: "1rem" }}>
            <h2 style={{ fontWeight: "bolder" }}>
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
                {title}
              </ShowMoreText>
            </h2>
            <h3 className="mb-0 text-muted" style={{ fontWeight: "bolder" }}>
              {category}
            </h3>
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
            <h4 className="mt-2">
              <b>
                Suggested by:{" "}
                <u>{suggestorName != " " ? suggestorName : suggestorEmail}</u>
              </b>
            </h4>
          </div>
        </div>{" "}
        {(status == "Pending" || status =="Rejected") && <h5 style={{color:"grey", marginTop: 8}}>Note: You cannot interact or comment with campaigns that are not approved or rejected.</h5>}
        {isVisit && (status != "Pending" && status != "Rejected") ? (
          <div className="mt-3">
            <div className="mb-0 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                {likeStatus.isLike != true ? (
                  <>
                    <Tooltip title="Like post">
                      <HeartOutlined
                        style={{
                          fontSize: "1.8rem",
                          color: "rgb(0, 49, 81)",
                          cursor: "pointer",
                        }}
                        onClick={() => likeIncrement()}
                      />
                    </Tooltip>
                    <p
                      style={{
                        color: "rgb(0, 49, 81)",
                        marginTop: 10,
                        marginLeft: 3,
                      }}
                    >
                      {likeStatus.likeCounter}
                    </p>
                  </>
                ) : (
                  <>
                    <Tooltip title="Unlike post">
                      <HeartFilled
                        style={{
                          fontSize: "1.8rem",
                          color: "rgb(252, 108, 133)",
                          cursor: "pointer",
                        }}
                        onClick={() => likeDecrement()}
                      />
                    </Tooltip>
                    <p
                      style={{
                        color: "rgb(252, 108, 133)",
                        marginTop: 10,
                        marginLeft: 3,
                      }}
                    >
                      {likeStatus.likeCounter}
                    </p>
                  </>
                )}

                {participantStatus.isParticipant != true ? (
                  <>
                    <Tooltip title="Participate to campaign">
                      <BsPeopleFill
                        style={{
                          fontSize: "2rem",
                          color: "rgb(0, 49, 81)",
                          marginLeft: 5,
                        }}
                        className="custom-hover-pointer"
                        onClick={() => participantIncrement()}
                      />
                    </Tooltip>
                    <p style={{ color: "rgb(0, 49, 81)", marginTop: 10 }}>
                      {participantStatus.participantCounter}
                    </p>
                  </>
                ) : (
                  <>
                    <Tooltip title="Don't participate to campaign">
                      <BsPeopleFill
                        style={{
                          fontSize: "2rem",
                          marginLeft: 5,
                          color: "	#0080FE",
                        }}
                        className="custom-hover-pointer"
                        onClick={() => participantDecrement()}
                      />
                    </Tooltip>
                    <p style={{ color: "#0080FE", marginTop: 10 }}>
                      {participantStatus.participantCounter}
                    </p>
                  </>
                )}
              </div>
              <div className="d-flex align-items-center">
                  <Button
                    style={{
                      color: "rgb(0, 49, 81)",
                    }}
                    type="default"
                    shape="round"

                    onClick={() => setIsModalOpen(true)}
                  >
                    View Participants
                  </Button>

                {enableVisit ? (
                  <Link to={href}>
                    <Button type="primary" shape="round">
                      Visit
                    </Button>
                  </Link>
                ) : null}
              </div>
              {/* <MessageOutlined
                    style={{
                      fontSize: "1.8rem",
                      color: "#3e79f7",
                      cursor: "pointer",
                    }}
                  />
                  <p style={{ color: "#3e79f7" }}>8</p> */}
            </div>
            {enablePost ? (
              <>
                <hr className="hr-style" />
                <CommentSection generalId={campaignId} orgId={orgId} />
              </>
            ) : null}
          </div>
        ) : null}
      </Card>

      <ModalCampaign
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};
CampaignCard.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
  images: PropTypes.array,
  content: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  classData: PropTypes.string,
  isVisit: PropTypes.bool,
  enableVisit: PropTypes.bool,
  enablePost: PropTypes.bool,
  href: PropTypes.string,
  orgName: PropTypes.string,
  orgId: PropTypes.string,
  publisherName: PropTypes.string,
  suggestorName: PropTypes.string,
  suggestorEmail: PropTypes.string,
  orgProfile: PropTypes.object,
  campaignStatus: PropTypes.object,
  likeStatus: PropTypes.object,
  participantStatus: PropTypes.object,
  loading: PropTypes.bool,
};

CampaignCard.defaultProps = {
  padding: "5",
  title: "",
  category: "",
  images: [],
  content: "",
  margin: "0px",
  isVisit: true,
  enableVisit: true,
  enablePost: false,
  orgName: "",
  orgId: "",
  classData: "",
  href: "",
  publisherName: "",
  suggestorName: "No info",
  suggestorEmail: "No info",
  orgProfile: {},
  participantStatus: {
    participantCounter: 70,
    isParticipant: false,
    participants: [],
  },
  likeStatus: { likeCounter: 420, isLike: false, likes: [] },
  campaignStatus: {
    likeCounter: 420,
    isLike: false,
    participantCounter: 70,
    isParticipant: false,
    participants: [],
    likes: [],
  },
  loading: false,
};
export default CampaignCard;
