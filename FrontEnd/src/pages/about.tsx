// Data and Imports
import { FunctionComponent } from 'react';
import { css } from '@emotion/react';
import Head from 'next/head';
import {
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiText,
  EuiIcon,
  EuiTitle,
} from '@elastic/eui';
import Wrapper from '../components/starter/wrapper';

// --------

// custom defined element styles
// bordered rounded tile
const head = css`
  borderRadius: '25px',
  border: '1px solid #666666',
  padding: '5px',
  top: 'auto',
  bottom: 'auto',
`;
// small bold title font
const title = css`
  line-height: 1.75;
`;

// --------

// building the page's actual composition and styling
// by returning a React component containing mostly EUI html
const About: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>About our Site</title>
      </Head>

      <Wrapper>
        {/* Section I: Site Logo, Branding, and page information */}
        <EuiSpacer size="s" />
        <EuiFlexGroup css={head}>
          <EuiFlexItem>
            <EuiText>
              <h3>About the Schedule Builder</h3>
              <p>
                Created as a project for IT Senior Design (482) on behalf of the
                NMT Registrar&apos;s Office
              </p>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiImage
              size={300}
              hasShadow={true}
              allowFullScreen
              alt="NMTLogo"
              css={{ borderRadius: '25px' }}
              url="/images/logo.jpg"
              caption="NMT"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText textAlign="right">
              <h3>Purpose and Role</h3>
              <p>
                To help students and advisors more easily find & use NMT course
                information to make a schedule right for them
              </p>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>

        {/* Section II: Information about the site, Why it was needed */}
        {/* Factoids and survey data for what NMT users wanted */}
        <EuiSpacer size="m" />
        <EuiFlexGroup>
          <EuiFlexItem>
            {/* Preface regarding the source of survey information quoted thru-out the page */}
            <EuiText textAlign="center">
              <h2>About the Site</h2>
              <h5 style={{ color: '#0079A5' }}>
                In March, during the Spring 2023 NMT term, we conducted a survey
                of NMT students, staff, and faculty regarding their experiences
                and satisfaction with the current processes and options for
                making a schedule here at NMT. The key results are better
                understood using the breakdown below.
              </h5>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="m" />
        <EuiFlexGroup>
          {/* Left bullet point list */}
          <EuiFlexItem>
            <EuiText>
              <h2>What this site does:</h2>
              <ul style={{ listStyle: 'square' }}>
                <li>
                  Helps users find NMT course catalog / degree program
                  information more easily than browsing documents
                </li>
                <li>
                  Helps users find the courses they need, more quickly and
                  easily than with Banweb
                </li>
                <li>
                  Helps users with a nice calendar that can be easily exported
                  or screenshotted for later use
                </li>
                <li>
                  Helps users identify and resolve things like pre-requisite and
                  time conflicts with courses
                </li>
              </ul>
            </EuiText>
          </EuiFlexItem>
          {/* Right bullet point list */}
          <EuiFlexItem>
            <EuiText>
              <h2>Why it was needed:</h2>
              <ul style={{ listStyle: 'square' }}>
                <li>
                  45.5% of NMT users said Banweb needed better searching and
                  page navigation, 26.2% said it needed better readability and
                  formatting
                </li>
                <li>
                  Banweb is older, and harder to use for some, especially on
                  mobile
                </li>
                <li>
                  Beanweb works but doesn&apos;t have all course information,
                  and isn&apos;t updated regularly enough
                </li>
              </ul>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>

        {/* Section III: more about the purpose of the site */}
        <EuiSpacer size="m" />
        <EuiText textAlign="center">
          <h2>Why use our site over Banweb or Beanweb?</h2>
        </EuiText>
        <EuiSpacer size="m" />
        <EuiFlexGroup>
          {/* Left bullet point list */}
          <EuiFlexItem>
            <ul style={{ listStyle: 'square', textAlign: 'center' }}>
              <li>
                45.5% of respondents said Banweb needs better searching and page
                navigation
              </li>
              <li>26.2% said it needs better readability and formatting</li>
              <li>
                This platform&apos;s aim is to directly address both issues with
                an easy to use and navigate, modern scheduler
              </li>
            </ul>
          </EuiFlexItem>
          {/* Right bullet point list */}
          <EuiFlexItem>
            <ul style={{ listStyle: 'square', textAlign: 'center' }}>
              <li>
                22.2% said Beanweb needs better readability and formatting
              </li>
              <li>Another 22.2% said Beanweb needs better data accuracy</li>
              <li>
                We want to improve upon student & staff scheduling workflows, by
                offering an easier way to plan your semesters
              </li>
            </ul>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        <EuiSpacer size="m" />

        {/* Section IV: Useful Links and misc */}
        <EuiFlexGroup css={head}>
          <EuiFlexItem>
            <EuiText textAlign="center">
              <h3>Some Useful Links for You:</h3>
              <EuiFlexGroup>
                {/* Icon and link for Banweb */}
                <EuiFlexItem>
                  <a href="https://banweb7.nmt.edu/pls/PROD/twbkwbis.P_ValLogin">
                    <EuiIcon type="documents" size="xl" />
                    <br />
                    <EuiTitle size="xs" css={title}>
                      <span>Banweb</span>
                    </EuiTitle>
                  </a>
                </EuiFlexItem>
                {/* Icon and link for NMT */}
                <EuiFlexItem>
                  <a href="https://www.nmt.edu">
                    <EuiIcon type="namespace" size="xl" />
                    <br />
                    <EuiTitle size="xs" css={title}>
                      <span>NMT</span>
                    </EuiTitle>
                  </a>
                </EuiFlexItem>
                {/* Icon and link for the registrar */}
                <EuiFlexItem>
                  <a href="https://www.nmt.edu/registrar/">
                    <EuiIcon type="paperClip" size="xl" />
                    <br />
                    <EuiTitle size="xs" css={title}>
                      <span>Registrar</span>
                    </EuiTitle>
                  </a>
                </EuiFlexItem>
                {/* Icon and link for the degree audit platform */}
                <EuiFlexItem>
                  <a href="https://dwapp-ext.id.nmt.edu:9901/">
                    <EuiIcon type="visLine" size="xl" />
                    <br />
                    <EuiTitle size="xs" css={title}>
                      <span>Degree Audit</span>
                    </EuiTitle>
                  </a>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiText>
          </EuiFlexItem>

          {/* Final, simple links for contacting site developers */}
          <EuiFlexItem>
            <EuiText textAlign="center">
              <h3>Need more information?</h3>
              <p>
                Feel free to contact the registrar&apos;s office{' '}
                <a href="mailto:registrar@nmt.edu">
                  here
                  <br />
                </a>
                Or the development team{' '}
                <a href="mailto:gabriel.ingebrigtsen-leiker@student.nmt.edu">
                  here
                  <br />
                </a>
                for more information
              </p>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        <EuiSpacer size="m" />
      </Wrapper>
    </>
  );
};

// rendering contents for display
export default About;
