import { useState, useRef, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import styled, { keyframes, css, createGlobalStyle } from "styled-components";
import LandingPageImg from "../images/landingpageimg.png";
import CustomCursor from "../components/cursor";
import MeetOrbor from "../components/meetorbor";
import BoxExample from "../components/examplebox";
import { Breakpoint } from "react-socks";
import BackgroundImage from "../images/background.png";
import MobileWallpaper from "../images/mobilewallpaper.png";

const ColourScheme = styled.div`
  background: #0d1117;
  transition: all 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  margin: 0;

  @media (max-width: 768px) {
    width: 325%;
    max-width: 325%;

    background-image: url(${MobileWallpaper});
  }

  @media (max-width: 1709px) or (max-height: 873px) {
    background-image: url(${BackgroundImage});
    padding-bottom: 5%;
  }
`;

const MainTitle = styled.h1`
  font-size: 40px;
  color: rgb(225, 48, 108);
`;

const Image = styled.img`
  margin-left: 60%;
  z-index: 1;
  margin-top: -30%;
  height: 88vh;
  width: 40%;
  z-index: 1;

  @media (max-width: 1709px) or (max-height: 873px) {
    display: none;
  }
`;

const MobileImage = styled.img`
  @media (max-width: 600px) {
    width: 100%;
    margin-top: 30%;
  }
`;

const typingAnim = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const deletingAnim = keyframes`
  from { width: 100% }
  to { width: 0 }
`;

const TypingTextContainer = styled.div`
  padding: 5px;

  display: flex;
  justify-content: left;
  align-items: left;
  width: 30%;
  height: 120px;
  margin-top: 5%;
  margin-left: 5%;
`;

const Title = styled.h1<{ typing: boolean; deleting: boolean }>`
  font-size: 60px;
  overflow: hidden;
  color: #e1306c;
  margin-top: -80px;
  margin-left: 56%;
  white-space: nowrap;
  font-weight: 700;
  border-right: 0.15em solid rgb(225, 48, 108);
  width: ${({ typing, deleting }) =>
    typing ? "100%" : deleting ? "0%" : "100%"};
  animation: ${({ typing, deleting }) =>
    typing
      ? css`
          ${typingAnim} 2s steps(40, end) forwards
        `
      : deleting
      ? css`
          ${deletingAnim} 2s steps(40, end) forwards
        `
      : "none"};
  @media (max-width: 600px) {
    font-size: 95px;
    margin-left: 1px;
    margin-top: -10px;
  }
`;

const Separator = styled.div`
  border-bottom: 6px solid #e1306c;

  margin-top: %;
  width: 30%;
  margin-left: 100px;

  @media (max-width: 600px) {
    margin-top: 5%;
    margin-left: 70px;
`;

const RegularTitle = styled.h1`
  font-size: 60px;
  color: white;

  font-weight: 700;
  white-space: nowrap; /* Prevent line breaks */
  margin-top: -5%;

  @media (max-width: 600px) {
    font-size: 90px;
    margin-top: -10px;
  }
`;

const Subtitle = styled.p`
  color: white;
  font-size: 22px;
  margin-top: 20px;
  margin-left: 100px;
  font-weight: 200;
  @media (max-width: 600px) {
    margin-left: 65px;
    margin-top: 25%;
    font-size: 42px;
`;

const DBody = () => {
  const titles = [
    "Finding Snippets",
    "Liking Snippets",
    "Favouriting Snippets",
    "Sharing Snippets",
  ];
  const [titleIndex, setTitleIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const changeTitle = () => {
      setTyping(!typing);
      if (!typing) {
        setTitleIndex((titleIndex + 1) % titles.length);
      }
    };
    const intervalId = setInterval(changeTitle, 4000);
    return () => clearInterval(intervalId);
  }, [titleIndex, typing]);

  return (
    <TypingTextContainer>
      <RegularTitle>
        Maximise your experience
        <br /> on ShareSnips
        <Title typing={typing} deleting={!typing}>
          by {titles[titleIndex]}
        </Title>
      </RegularTitle>
    </TypingTextContainer>
  );
};

const MBody = () => {
  const titles = [
    "Finding Snippets",
    "Liking Snippets",
    "Favouriting Snippets",
    "Sharing Snippets",
  ];
  const [titleIndex, setTitleIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const changeTitle = () => {
      setTyping(!typing);
      if (!typing) {
        setTitleIndex((titleIndex + 1) % titles.length);
      }
    };
    const intervalId = setInterval(changeTitle, 4000);
    return () => clearInterval(intervalId);
  }, [titleIndex, typing]);

  return (
    <TypingTextContainer>
      <RegularTitle>
        Maximise your <br /> experience on ShareSnips
        <Title typing={typing} deleting={!typing}>
          by {titles[titleIndex]}
        </Title>
      </RegularTitle>
    </TypingTextContainer>
  );
};

const LandingPage: React.FC = () => {
  return (
    <ColourScheme>
      <Navbar />
      <CustomCursor />
      <MeetOrbor />
      <Breakpoint large up>
        <DBody />
        <Subtitle>
          Get the most out of ShareSnips by sharing snippets, liking snippets,
          favouriting snippets and finding snippets.
        </Subtitle>
        <Separator />

        <BoxExample />
        <Image src={LandingPageImg} />
      </Breakpoint>
      <Breakpoint small down>
        <MBody />
        <Subtitle>
          Get the most out of ShareSnips by sharing snippets, liking snippets,
          favouriting snippets and finding snippets.
        </Subtitle>
        <BoxExample />
        <MobileImage src={LandingPageImg} />
      </Breakpoint>
    </ColourScheme>
  );
};

export default LandingPage;
