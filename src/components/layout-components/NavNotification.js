import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Badge, Avatar, List, Button, Skeleton } from "antd";
import {
  MailOutlined,
  BellOutlined,
  WarningOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import notificationData from "assets/data/notification.data.json";
import Flex from "components/shared-components/Flex";
import axios from "axios";
import InfinitScroll from "react-infinite-scroll-component";
import { useAuth } from "contexts/AuthContext";
import moment from "moment";
import utils from "utils";
import { useHistory } from "react-router-dom";

const getIcon = (icon) => {
  switch (icon) {
    case "mail":
      return <MailOutlined />;
    case "alert":
      return <WarningOutlined />;
    case "check":
      return <CheckCircleOutlined />;
    default:
      return <MailOutlined />;
  }
};

export const NavNotification = () => {
  const { generateToken } = useAuth();
  let history = useHistory();
  // notification State
  const [notification, setNotification] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  // Page State
  const count = 5;
  const [start, setStart] = useState(0);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(notificationData);
  //Loading State
  const [drawer, setDrawer] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [landingLoading, setlandingLoading] = useState(true);

  const redirectLink = (data) => {
    handleVisibleChange(false);
    history.push(data);
  };
  const handleVisibleChange = (flag) => {
    setVisible(flag);
    let readData = [];
    if (notification.length > 0) {
      notification.map((item) => readData.push(item.notification_id));
      const data = {
        notification_id: readData,
      };
      console.log("clicked");
      setNotificationCount([]);
      updateNotification(data, generateToken()[1]);
    }
  };

  const handleCallBackNext = (res) => {
    setNotification((oldArray) => [...oldArray, ...res.data]);
    setLoading(false);

    setHasMore(res.data.length > 0);
  };
  const getNotification = async (result, token) => {
    try {
      return axios.get(
        `/api/app/notification?start=${0}&result=${result}`,
        token
      );
    } catch (error) {
      return console.log(error);
    }
  };

  const getNotificationNext = async (start, result, token, callback) => {
    try {
      await axios
        .get(`/api/app/notification?start=${start}&result=${result}`, token)
        .then((res) => {
          callback(res);
        });
    } catch (error) {
      return console.log(error);
    }
  };
  const updateNotification = async (data, token) => {
    try {
      await axios
        .post(`/api/app/notification/update`, data, token)
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      return console.log(error);
    }
  };

  const loadMore =
    !landingLoading && !loading ? (
      <div
        className="mb-2"
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        {hasMore ? (
          <div className="">
            <a
              className="d-block"
              href="#/"
              onClick={() => {
                setLoading(true);
                setStart(count + start);
                getNotificationNext(
                  start + count,
                  count,
                  generateToken()[1],
                  handleCallBackNext
                );
              }}
            >
              Load More
            </a>
          </div>
        ) : null}
      </div>
    ) : null;
  const getNotificationBody = (list) => {
    return list.length > 0 ? (
      <List
        size="small"
        loading={landingLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => {
          return (
            <>
              {console.log(item?.link)}
              {item?.type === "organization" ? (
                <Skeleton avatar title={false} loading={loading} active>
                  <List.Item
                    onClick={() => redirectLink(item?.link || "")}
                    style={{
                      backgroundColor: item.is_read ? "#58555512" : "",
                    }}
                    className="list-clickable"
                  >
                    <Flex alignItems="center">
                      <div className="pr-3">
                        {item.organization_id[0].profile?.fileUrl ? (
                          <Avatar
                            src={item.organization_id[0]?.profile?.fileUrl}
                          />
                        ) : (
                          <Avatar
                            className={`ant-avatar-${item.type}`}
                            style={{
                              backgroundColor:
                                item.organization_id[0]?.profile_color,
                            }}
                          >
                            <b>
                              {utils.getNameInitial(
                                item.organization_id[0].organization_name ||
                                  "N/A"
                              )}
                            </b>
                          </Avatar>
                        )}
                      </div>
                      <div className="mr-3">
                        <span className="font-weight-bold text-dark">
                          {item.organization_id[0].organization_name}{" "}
                        </span>
                        <span className="text-gray-light">{item.message}</span>
                      </div>
                      <small className="ml-auto">
                        {moment(item.updatedAt).format("LT")}
                      </small>
                    </Flex>
                  </List.Item>
                </Skeleton>
              ) : (
                <Skeleton avatar title={false} loading={loading} active>
                  <List.Item
                    style={{ backgroundColor: item.is_read ? "#58555512" : "" }}
                    className="list-clickable"
                    onClick={() => redirectLink(item?.link || "")}
                  >
                    <Flex alignItems="center">
                      <div className="pr-3">
                        {item.user_id.profileUrl?.data ? (
                          <Avatar src={item.user_id.profileUrl?.data} />
                        ) : (
                          <Avatar
                            className={`ant-avatar-${item?.type}`}
                            style={{
                              backgroundColor: item?.user_id?.profileLogo,
                            }}
                          >
                            <b>
                              {utils.getNameInitial(
                                item?.user_id?.full_name || "N/A"
                              )}
                            </b>
                          </Avatar>
                        )}
                      </div>
                      <div className="mr-3">
                        <span className="font-weight-bold text-dark">
                          {item?.user_id?.full_name}{" "}
                        </span>
                        <span className="text-gray-light">{item.message}</span>
                      </div>
                      <small className="ml-auto">
                        {moment(item.updatedAt).format("LT")}
                      </small>
                    </Flex>
                  </List.Item>
                </Skeleton>
              )}
            </>
          );
        }}
      />
    ) : (
      <div className="empty-notification">
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          alt="empty"
        />
        <p className="mt-3">You have viewed all notifications</p>
      </div>
    );
  };
  useEffect(() => {
    let isMounted = true;
    const token = generateToken()[1];
    setlandingLoading(true);
    getNotification(count, token).then((response) => {
      if (isMounted) {
        setNotification(response.data);
        setlandingLoading(false);
        console.log(response);
        setNotificationCount(response.headers["x-total-count"]);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const notificationList = (
    <div className="nav-dropdown nav-notification">
      <div className="nav-notification-header d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Notification</h4>
        <Button
          className="text-primary"
          type="text"
          onClick={() => {
            setNotification([]);
            setNotificationCount(0);
          }}
          size="small"
        >
          Clear{" "}
        </Button>
      </div>
      <div className="nav-notification-body">
        {getNotificationBody(notification)}
      </div>
      {data.length > 0 ? (
        <div className="nav-notification-footer">
          <a className="d-block" href="#/">
            View all
          </a>
        </div>
      ) : null}
    </div>
  );

  return (
    <Dropdown
      placement="bottomRight"
      overlay={notificationList}
      onVisibleChange={handleVisibleChange}
      visible={visible}
      trigger={["click"]}
    >
      <Menu mode="horizontal">
        <Menu.Item key="notification">
          <Badge count={notificationCount}>
            <BellOutlined
              className="mx-auto nav-icon"
              type="bell"
              style={{ color: "white" }}
            />
          </Badge>
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default NavNotification;
