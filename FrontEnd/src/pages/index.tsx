// Data and Imports
import { FunctionComponent } from 'react';
import Head from 'next/head';
import {
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiText,
  EuiLink,
  EuiButton,
} from '@elastic/eui';
import Wrapper from '../components/starter/wrapper';
// --------

// custom defined element styles
// bordered rounded tile
const head = {
  borderRadius: '25px',
  border: '1px solid #666666',
  padding: '5px',
  top: 'auto',
  bottom: 'auto',
};

// --------

// building the page's actual composition and styling
// by returning a React component containing mostly EUI html
const Index: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>NMT Schedule Building</title>
      </Head>

      <Wrapper>
        <EuiSpacer size="m" />
        {/* Section I: Site Logo, Branding, and page information */}
        <EuiFlexGroup style={head}>
          <EuiText>
            <h2>NMT Course Lookup & Schedule Planning</h2>
            <p>
              Welcome to the NMT Schedule Builder! You can use this site to look
              up classes and their details, plan your schedules following your
              degree program, avoid time conflicts, and create a personal
              calendar! For more information, check{' '}
              <EuiLink href="./about">here.</EuiLink>
            </p>
          </EuiText>

          <EuiFlexItem></EuiFlexItem>
          <EuiFlexItem>
            <EuiImage
              size={700}
              hasShadow={true}
              allowFullScreen
              alt="NMTLogo"
              style={{ borderRadius: '25px' }}
              url="/images/logo.jpg"
              caption="NMT"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="s" />

        {/* Section II: directions for getting started using the platform */}
        <EuiText textAlign="center">
          <h2>Get started making your schedule now!</h2>
        </EuiText>
        <EuiSpacer size="s" />
        <div style={head}>
          <EuiSpacer size="m" />
          <EuiText textAlign="center">
            <h4>
              Find all the courses you need, work out a schedule, and generate a
              calendar using the steps and pages below.
            </h4>
          </EuiText>
          <EuiSpacer size="m" />
          <EuiFlexGroup>
            <EuiFlexItem></EuiFlexItem>
            <EuiFlexItem style={{ flexGrow: 0, flexShrink: 0, flexBasis: '50%' }}>
              <ol style={{ listStyle: 'decimal', textAlign: 'center' }}>
                <li>
                  Most degree programs provide a flowchart of courses needed
                  graduate; use this as a reference, supplemented by the
                  catalog, to know what courses to take.
                </li>
                <EuiSpacer size="s" />
                <li>
                  Use the 'Course Lookup' page to find the courses you need, and
                  electives you'd like to take. Then, add your courses to
                  your cart using the checkboxes and button.
                </li>
                <EuiSpacer size="s" />
                <EuiButton href="./lookup" size="xs" color="primary">
                  Find Classes with Course Lookup
                </EuiButton>
                <EuiSpacer size="s" />
                <li>
                  The 'My Calendar' page, is generated from your Cart. Once
                  you've selected your courses, you can view your schedule as a
                  familiar weekly calendar, where you'll be easily able to
                  identify issues like time conflicts.
                </li>
                <EuiSpacer size="s" />
                <EuiButton href="./calendar" size="xs" color="primary">
                  Build Your Calendar
                </EuiButton>
                <EuiSpacer size="s" />
                <li>
                  When you're done, you can copy your selected CRNs to your
                  clipboard to register for classes using Banweb, or screenshot
                  your calendar to save it for later.
                </li>
                <EuiSpacer size="s" />
                <EuiButton
                  href="https://banweb7.nmt.edu/pls/PROD/twbkwbis.P_ValLogin"
                  size="xs"
                  color="primary">
                  Register on Banweb
                </EuiButton>
                <EuiSpacer size="s" />
              </ol>
            </EuiFlexItem>
            <EuiFlexItem></EuiFlexItem>
          </EuiFlexGroup>
        </div>

        {/* Section III: information about finding the catalog, or help from registrar */}
        <EuiSpacer size="s" />
        <EuiText textAlign="center">
          <h4>
            Need course catalog information? Browse{' '}
            <EuiLink href="https://catalog.nmt.edu">here</EuiLink>
            To find information about departments and degree programs.
          </h4>
          <h4>
            Or check the registrar's website{' '}
            <EuiLink href="https://www.nmt.edu/registrar/">here </EuiLink>
            for supplementary information about registration.
          </h4>
          <i>
            Note: this site <strong>cannot</strong> be used to register,
            you still have to use Banweb
          </i>
        </EuiText>
      </Wrapper>
    </>
  );
};

// rendering contents for display
export default Index;