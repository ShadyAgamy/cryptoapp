import React from "react";
import millify from "millify";

import Cryptocurrencies from "../Cryptocurrencies";
import News from "../News";

import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import "./styles.css";

import { useGetCryptosQuery } from "../../services/cryptoApi";

const { Title } = Typography;

const Homepage = () => {

  const { data, isFetching } = useGetCryptosQuery(10);
  const globalState = data?.data?.stats;

  console.log(data);

  if (isFetching) return "Loading...";

  return (
    <>
      <Title level={2} className="heading">
        Gloal Crypto stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(globalState.totalCoins)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalState.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalState.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalState.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalState.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Lates Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
