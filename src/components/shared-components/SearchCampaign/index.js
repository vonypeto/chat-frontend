import React, { useState, useEffect } from "react";
import { Card, Button, Tag, Avatar } from "antd";
import utils from "utils";
import { COLORS } from "constants/ChartConstant";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
const SearchCampaign = (props) => {
  const { id, campaign_id, profile, name, address, startDate, title, link } = props;
  const history = useHistory()
  if (link != "") {
    var redirectLink = link
  } else {
    var redirectLink = `/home/posts/${id}/${campaign_id}/single/data`
  }

  return (
    <>
      <Card className="no-border">
        <div className={`d-flex align-items-center justify-content-between`}>
          <div className="avatar-status d-flex align-items-center">
            {profile != null ? (
              <Avatar
                className="mt-2 mr-2 rounded custom-hover-pointer"
                icon={<UserOutlined />}
                src={profile}
                size={70}
                onClick={() => history.push(redirectLink)}
              >
                {utils.getNameInitial(name)}
              </Avatar>
            ) : (
              <Avatar
                size={70}
                className="mt-2 mr-2 rounded custom-hover-pointer"
                style={{
                  backgroundColor:
                    COLORS[Math.floor(Math.random() * COLORS.length)],
                }}
                onClick={() => history.push(redirectLink)}
              >
                {utils.getNameInitial(name)}
              </Avatar>
            )}

            <div className="ml-2">
              <div>
                <div className="avatar-status-name">
                  <span
                    className="custom-text-hover-pointer"
                    onClick={() => history.push(redirectLink)}
                  >
                    {moment(startDate).calendar()}
                  </span>
                </div>
              </div>
              <div className=" avatar-status-subtitle" style={{ fontSize: 15 }}>
                <b
                  className="custom-text-hover-pointer"
                  onClick={() => history.push(redirectLink)}
                >
                  {title}
                </b>
              </div>
              <div className="text-muted avatar-status-subtitle ">
                {address}
              </div>
            </div>
          </div>
          <div>
            <Link to={redirectLink}>
              <Button type="primary" shape="round">
                View
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </>
  );
};
SearchCampaign.propTypes = {
  id: PropTypes.string,
  campaign_id: PropTypes.string,
  profile: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  address: PropTypes.string,
  link: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
};

SearchCampaign.defaultProps = {
  id: "",
  campaign_id: "",
  profile: null,
  name: "",
  title: "",
  address: "",
  link: "",
  createdAt: moment().format(`LL`),
};
export default SearchCampaign;
