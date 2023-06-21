import { React, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import moment from "moment";
import axios from "axios";
import CampaignCard from "components/shared-components/CampaignCard";
import { Col, Row } from "antd";

const CampaignView = ({ organization_id, campaign_id }) => {
  //for api
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const { generateToken } = useAuth();

  //useState
  const [campaign, setCampaign] = useState({});
  const [loading, setLoading] = useState(true);

  //useEffect
  useEffect(() => {
    getCampaign();
  }, []);

  //axios
  const getCampaign = async () => {
    setLoading(true);

    await axios
      .post(
        `/api/campaign/get`,
        {
          organization_id,
          campaign_id,
        },
        generateToken()[1],
        { cancelToken }
      )
      .then((res) => {
        var data = res.data;
        console.log("data", data);
        data.starting_date = moment(new Date(data.starting_date));

        setCampaign(data);
      })
      .catch((error) => {
        message.error("There is a problem with uploading the data!!!");
        console.log("error", error);
      });

    setLoading(false);
  };

  return (
    <>
      {Object.keys(campaign).length > 0 &&
        <Row gutter={16} justify="center">
          <Col xs={24} sm={21} md={22} lg={12} xl={12} xxl={12}>
            <div>
              <CampaignCard
                title={campaign.title}
                category={campaign.category}
                orgName={campaign?.organization?.organization_name}
                startingDate={campaign.starting_date}
                content={campaign.description}
                orgId={campaign?.organization?.organization_id}
                orgProfile={campaign?.organization?.profile}
                images={campaign.images}
                status={campaign?.status}
                campaignStatus={{ likeCounter: campaign.likeCounter, isLike: campaign.isLike, participantCounter: campaign.participantCounter, isParticipant: campaign.isParticipant }}
                // isVisit={false}
                suggestorName={campaign?.suggestor?.first_name + " " + campaign?.suggestor?.last_name}
                suggestorEmail={campaign?.suggestor?.email}
                campaignId={campaign._id}
                enableVisit={false}
                enablePost={true}
                href={`/home/organization/${campaign?.organization?.organization_id}/campaign/${campaign?._id}`}
              />
            </div>
          </Col>
        </Row>
      }
    </>
  );
};

export default CampaignView;
