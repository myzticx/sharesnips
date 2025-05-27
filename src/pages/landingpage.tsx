import React from "react";
import styled from "styled-components";
import { Route, Link } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #000000, #1d4ed8);
  color: white;
  position: relative;
`;

const NavWrapper = styled.div`
  padding-top: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 80rem;
  margin: 0 auto;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background: linear-gradient(to bottom right, #3b82f6, #7c3aed);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoIconInner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid white;
  border-radius: 0.25rem;
  transform: rotate(45deg);
`;

const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
`;

const NavMenu = styled.div`
  display: none;
  align-items: center;
  gap: 2rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

const NavButton = styled.button`
  background: #2563eb;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #1d4ed8;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`;

const ContentWrapper = styled.div`
  max-width: 64rem;
  margin: 0 auto;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
`;

const PulseDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background: #60a5fa;
  border-radius: 50%;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const MainHeading = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.1;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2.5rem;
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CTAButton = styled.button`
  background: #2563eb;
  color: white;
  padding: 1rem 2rem;
  border-radius: 9999px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: #1d4ed8;
    transform: scale(1.05);
  }
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 4rem;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Star = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  background: #fbbf24;
  border-radius: 50%;
`;

const RatingText = styled.span`
  color: rgba(255, 255, 255, 0.7);
`;

const MockupsContainer = styled.div`
  position: relative;
`;

const MockupsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 2rem;
  }
`;

const MockupCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 1rem;
  width: 18rem;
  transition: transform 0.3s ease;

  &.left {
    transform: rotate(6deg);
    &:hover {
      transform: rotate(3deg);
    }
  }

  &.center {
    width: 20rem;
    z-index: 10;
    position: relative;
  }

  &.right {
    transform: rotate(-6deg);
    &:hover {
      transform: rotate(-3deg);
    }
  }
`;

const MockupContent = styled.div`
  border-radius: 0.75rem;
  height: 12rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &.pink-gradient {
    background: linear-gradient(to bottom right, #f472b6, #7c3aed);
  }

  &.dark-gradient {
    background: linear-gradient(to bottom right, #374151, #111827);
    height: 13rem;
  }
`;

const MockupTitle = styled.span`
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 1rem;
`;

const MockupSubtitle = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

const ColorBlock = styled.div`
  width: 4rem;
  height: 3rem;
  border-radius: 0.25rem;

  &.pink {
    background: #f472b6;
  }
  &.blue {
    background: #60a5fa;
  }
  &.orange {
    background: #fb923c;
  }
`;

const MockupPlaceholder = styled.div`
  margin-top: 0.5rem;
`;

const PlaceholderLine = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.25rem;
  height: 0.75rem;
  margin-bottom: 0.5rem;

  &.full {
    width: 100%;
  }
  &.three-quarters {
    width: 75%;
  }
  &.two-thirds {
    width: 66.67%;
  }
  &.half {
    width: 50%;
  }
`;

const BottomRating = styled.div`
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const SmallStar = styled.div`
  width: 1rem;
  height: 1rem;
  background: #fbbf24;
  border-radius: 50%;
`;

const SmallRatingText = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
`;

const BrandLogos = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  opacity: 0.5;
`;

const BrandLogo = styled.div`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.875rem;
  font-weight: 500;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: -1;
`;

const BackgroundBlur = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(3rem);

  &.top-right {
    top: 0;
    right: 0;
    width: 50%;
    height: 50%;
    background: linear-gradient(
      to bottom left,
      rgba(37, 99, 235, 0.2),
      rgba(124, 58, 237, 0.1),
      transparent
    );
  }

  &.bottom-left {
    bottom: 0;
    left: 0;
    width: 50%;
    height: 50%;
    background: linear-gradient(
      to top right,
      rgba(67, 56, 202, 0.2),
      rgba(37, 99, 235, 0.1),
      transparent
    );
  }

  &.center-left {
    top: 25%;
    left: 25%;
    width: 24rem;
    height: 24rem;
    background: rgba(124, 58, 237, 0.05);
  }

  &.bottom-right {
    bottom: 25%;
    right: 25%;
    width: 20rem;
    height: 20rem;
    background: rgba(59, 130, 246, 0.08);
  }
`;

const LandingPage: React.FC = () => {
  return (
    <Container>
      <NavWrapper>
        <Nav>
          <LogoSection>
            <LogoIcon>
              <LogoIconInner />
            </LogoIcon>
            <LogoText>ShareSnips</LogoText>
          </LogoSection>

          <NavMenu>
            <NavLink href="#">About</NavLink>
            <NavLink href="#">Services</NavLink>
            <NavLink href="#">Purchase Plans</NavLink>
            <NavLink href="#">Creator</NavLink>
            <NavLink href="#">Resources</NavLink>
            <NavButton>Contact Us</NavButton>
          </NavMenu>
        </Nav>
      </NavWrapper>

      <MainContent>
        <ContentWrapper>
          <Badge>
            <span>Start Sharing Snips, Today!</span>
            <PulseDot />
          </Badge>

          <MainHeading>
            A Social Media App carefully
            <br />
            curated for Developers
          </MainHeading>

          <Subtitle>
            Our Mission is to allow people to express themselves using Code
            Snippets
          </Subtitle>

          <CTAButton>
            <Link to="/homepage">Start Sharing Your Snips</Link>
          </CTAButton>

          <RatingSection>
            <StarContainer>
              {[...Array(5)].map((_, i) => (
                <Star key={i} />
              ))}
            </StarContainer>
            <RatingText>4.9/5 Reviews</RatingText>
          </RatingSection>

          <MockupsContainer>
            <MockupsWrapper>
              <MockupCard className="left">
                <MockupContent className="pink-gradient">
                  <MockupTitle>Explore People's Snippets</MockupTitle>
                </MockupContent>
                <MockupPlaceholder>
                  <PlaceholderLine className="three-quarters" />
                  <PlaceholderLine className="half" />
                </MockupPlaceholder>
              </MockupCard>

              <MockupCard className="center">
                <MockupContent className="dark-gradient">
                  <MockupTitle>Populate The Feed </MockupTitle>
                  <MockupSubtitle>
                    with Your Own Inspiring Snippets
                  </MockupSubtitle>
                  <ColorGrid>
                    <ColorBlock className="pink" />
                    <ColorBlock className="blue" />
                    <ColorBlock className="orange" />
                  </ColorGrid>
                </MockupContent>
                <MockupPlaceholder>
                  <PlaceholderLine className="full" />
                  <PlaceholderLine className="two-thirds" />
                </MockupPlaceholder>
              </MockupCard>

              <MockupCard className="right">
                <MockupContent className="dark-gradient">
                  <MockupTitle>
                    Discover, Share, and Upload Snippets, Only on ShareSnips
                  </MockupTitle>
                </MockupContent>
                <MockupPlaceholder>
                  <PlaceholderLine className="two-thirds" />
                  <PlaceholderLine className="three-quarters" />
                </MockupPlaceholder>
              </MockupCard>
            </MockupsWrapper>
          </MockupsContainer>

          <BottomRating>
            <StarContainer>
              {[...Array(5)].map((_, i) => (
                <SmallStar key={i} />
              ))}
            </StarContainer>
            <SmallRatingText>4.9/5 from 3,602 customers</SmallRatingText>
          </BottomRating>

          <BrandLogos>
            <BrandLogo>I</BrandLogo>
            <BrandLogo>have</BrandLogo>
            <BrandLogo>no</BrandLogo>
            <BrandLogo>partnerships</BrandLogo>
            <BrandLogo>lmao</BrandLogo>
            <BrandLogo>idek</BrandLogo>
            <BrandLogo>what im doing</BrandLogo>
          </BrandLogos>
        </ContentWrapper>
      </MainContent>

      {/* Background Pattern */}
      <BackgroundPattern>
        <BackgroundBlur className="top-right" />
        <BackgroundBlur className="bottom-left" />
        <BackgroundBlur className="center-left" />
        <BackgroundBlur className="bottom-right" />
      </BackgroundPattern>
    </Container>
  );
};

export default LandingPage;
