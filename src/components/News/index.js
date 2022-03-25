import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card, Input } from "antd";
import moment from "moment";

import { useGetNewsQuery } from "../../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../../services/cryptoApi";
const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified, count }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptosList } = useGetCryptosQuery(100);
  console.log(cryptosList);
  const {
    data: cryptoNews,
    error,
    isLoading,
  } = useGetNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 12,
  });

  function onSearch(val) {
    console.log("search:", val);
  }

  if (isLoading) return "Loading...";

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Jack</Option>
            {cryptosList?.data?.coins.map((coin, i) => {
              return (
                <Option key={i} value={coin.name}>
                  {coin.name}
                </Option>
              );
            })}
          </Select>
          ,
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card" style={{ height: "100%" }}>
            <a
              href={news.url}
              target="_blank"
              rel="noreferrer"
              style={{ height: "100%" }}
            >
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  style={{ objectFit: "cover", height: "8rem" }}
                  alt="news"
                />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt=""
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>{moment(news.datePublished).startOf().fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
