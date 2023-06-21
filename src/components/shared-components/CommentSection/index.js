import React, { useState, useEffect } from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import { Col, Row, Skeleton, Card, message, Button } from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import { CommentData } from "./commentData";
import { useAuth } from "contexts/AuthContext";
import { PROFILE_URL } from "redux/constants/Auth";

const CommentComponent = (props) => {
  const { generateToken, currentUser } = useAuth();
  const { orgId, generalId } = props;
  const profile = JSON.parse(localStorage.getItem(PROFILE_URL) || "[]");
  const [isLoadingLanding, setIsLoadingLanding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showComment, setShowComment] = useState(false);
  const [deleteAction, setDeleteAction] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  // Page State
  const count = 5;
  const [start, setStart] = useState(3);

  const handleNextComment = (response) => {
    try {
      let resData = response.data;
      console.log(response.data);
      const modifiedArray = resData.map((obj) => {
        return {
          fullName: obj?.account?.full_name || "Deleted User",
          userId: obj?.account?.uuid,
          avatarUrl:
            obj?.account?.profileUrl?.data ||
            `https://ui-avatars.com/api/name=${
              obj?.account?.full_name || "U"
            }&background=${
              obj?.account?.profileLogo.replace("#", "") || "a0a0a0"
            }&color=FFFFFF&bold=true`,
          text: obj?.text,
          userProfile: "#",
          comId: obj?.comId,
          replies: obj?.replies.map((obj) => {
            return {
              fullName: obj?.account?.full_name || "Deleted User",
              userId: obj?.account?.uuid,
              avatarUrl:
                obj?.account?.profileUrl?.data ||
                `https://ui-avatars.com/api/name=${
                  obj?.account?.full_name || "U"
                }&background=${
                  obj?.account?.profileLogo.replace("#", "") || "a0a0a0"
                }&color=FFFFFF&bold=true`,
              text: obj?.text,
              userProfile: "#",
              comId: obj?.comId,
            };
          }),
        };
      });
      console.log(modifiedArray);
      setData((oldArray) => [...oldArray, ...modifiedArray]);
      setHasMore(response.data.length > 0);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmitCallback = (response) => {
    console.log(response.data);
  };
  const handleEditCallBack = (response) => {
    console.log(response.data);
    message.success("Edited");
  };
  const handleDeleteCallback = (response) => {
    const newData = data.filter((data) => data.comId !== response.data.comId);
    setData(newData);
  };
  const handleReplyCallback = (response) => {
    console.log(response.data);
  };
  //obj.values.map((val) => val * 2)
  const handleDataCallback = (response) => {
    try {
      let resData = response.data;
      const modifiedArray = resData.map((obj) => {
        console.log(obj?.account);
        return {
          fullName: obj?.account?.full_name || "Deleted User",
          userId: obj?.account?.uuid,
          avatarUrl:
            obj?.account?.profileUrl?.data ||
            `https://ui-avatars.com/api/name=${
              obj?.account?.full_name || "U"
            }&background=${
              obj?.account?.profileLogo.replace("#", "") || "a0a0a0"
            }&color=FFFFFF&bold=true`,
          text: obj?.text,
          userProfile: "#",
          comId: obj?.comId,
          replies: obj?.replies.map((obj) => {
            return {
              fullName: obj?.account?.full_name || "Deleted User",
              userId: obj?.account?.uuid,
              avatarUrl:
                obj?.account?.profileUrl?.data ||
                `https://ui-avatars.com/api/name=${
                  obj?.account?.full_name || "U"
                }&background=${
                  obj?.account?.profileLogo.replace("#", "") || "a0a0a0"
                }&color=FFFFFF&bold=true`,
              text: obj?.text,
              userProfile: "#",
              comId: obj?.comId,
            };
          }),
        };
      });
      console.log(modifiedArray);
      setData(modifiedArray);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCommentData = async (callback, token, count) => {
    try {
      await axios
        .get(
          `/api/comment/${generalId}/${orgId}?start=${0}&result=${count}`,

          token
        )
        .then((response) => {
          return callback(response);
        });
    } catch (error) {
      return console.log(error.message);
    }
  };
  const handleEditData = async (callback, data, token) => {
    try {
      await axios.post("/api/comment/update", data, token).then((response) => {
        return callback(response);
      });
    } catch (error) {
      message.error(error.message);
      return console.log(error.message);
    }
  };
  const handleReplyData = async (callback, data, token) => {
    try {
      await axios.post("/api/comment/reply", data, token).then((response) => {
        return callback(response);
      });
    } catch (error) {
      return console.log(error.message);
    }
  };
  const handleNextCommentData = async (callback, token, count, start) => {
    try {
      await axios
        .get(
          `/api/comment/${generalId}/${orgId}?start=${start}&result=${count}`,

          token
        )
        .then((response) => {
          return callback(response);
        });
    } catch (error) {
      return console.log(error.message);
    }
  };

  const onSubmit = async (callback, token, data) => {
    try {
      await axios.post("/api/comment/create", data, token).then((response) => {
        return callback(response);
      });
    } catch (error) {
      return console.log(error.message);
    }
  };
  const onDeleteData = async (callback, token, data) => {
    try {
      await axios.post("/api/comment/delete", data, token).then((response) => {
        return callback(response);
      });
    } catch (error) {
      return console.log(error.message);
    }
  };
  useEffect(() => {
    setIsLoadingLanding(true);
    Promise.all([
      handleCommentData(handleDataCallback, generateToken()[1], 3),
    ]).then(() => {
      setTimeout(() => {
        setIsLoadingLanding(false);
      }, 800);
    });
  }, []);
  //https://ui-avatars.com/api/name=Riya&background=random
  return (
    <>
      {isLoadingLanding ? (
        <>
          <Skeleton loading={isLoadingLanding} active avatar />
          <Skeleton loading={isLoadingLanding} active avatar />
        </>
      ) : (
        <div>
          <CommentSection
            currentUser={{
              currentUserId: currentUser?.uid,
              currentUserImg:
                currentUser?.photoURL ||
                `https://ui-avatars.com/api/name=${
                  currentUser?.displayName
                }&background=${profile?.profile_color.replace(
                  "#",
                  ""
                )}&color=FFFFFF&bold=true`,
              currentUserProfile: "#",
              currentUserFullName: currentUser?.displayName,
            }}
            logIn={{
              loginLink: "#",
              signupLink: "#",
            }}
            commentData={data}
            onSubmitAction={(data) => {
              console.log("check submit, ", data);
              const finalData = {
                text: data.text,
                comId: data.comId,
                replies: data.replies,
                generalId: generalId,
                organizationId: orgId,
              };
              onSubmit(handleSubmitCallback, generateToken()[1], finalData);
              setData((oldArray) => [...oldArray, data]);
            }}
            onDeleteAction={(data) => {
              console.log("delete", data);
              onDeleteData(handleDeleteCallback, generateToken()[1], data);
            }}
            onReplyAction={(data) => {
              let newData = data;
              newData.generalId = generalId;
              newData.organizationId = orgId;
              handleReplyData(handleReplyCallback, data, generateToken()[1]);
              console.log("reply submits, ", data);
            }}
            onEditAction={(data) => {
              console.log(data);
              handleEditData(handleEditCallBack, data, generateToken()[1]);
            }}
          />
          {isLoading ? (
            <>
              <Skeleton loading={isLoading} active avatar />
              <Skeleton loading={isLoading} active avatar />
            </>
          ) : null}
          <div className="text-center">
            <Row justify="center">
              <Col>
                {console.log(data.length)}
                {data.length && hasMore ? (
                  <>
                    {hasMore ? (
                      <Button
                        onClick={() => {
                          setStart(count + start);
                          setIsLoading(true);
                          handleNextCommentData(
                            handleNextComment,
                            generateToken()[1],
                            count,
                            start
                          );
                        }}
                        type="primary"
                        shape="round"
                      >
                        Show More
                      </Button>
                    ) : null}
                  </>
                ) : null}
              </Col>
            </Row>
          </div>{" "}
        </div>
      )}
    </>
  );
};
CommentComponent.propTypes = {
  generalId: PropTypes.string,
  orgId: PropTypes.string,
};

CommentComponent.defaultProps = {
  generalId: null,
  orgId: null,
};
export default CommentComponent;
