// Data and Imports
import { FunctionComponent } from 'react';
import Head from 'next/head';
import {
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiText,
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
const Help: FunctionComponent = () => {
  // building page content
  return (
    <>
      <Head>
        <title>Help with Scheduling</title>
      </Head>

      <Wrapper>
        {/* Section I: Site Logo, Branding, and page information */}
        <EuiSpacer size="l" />
        <EuiFlexGroup style={head}>
          <EuiFlexItem>
            <EuiText>
              <h3>Having issues?</h3>
              <p>
                Learn more about how to use this site here! See the FAQ and
                how-to guide below
              </p>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiImage
              size={300}
              hasShadow={true}
              allowFullScreen
              alt="NMTLogo"
              style={{ borderRadius: '25px' }}
              url="/images/logo.jpg"
              caption="NMT"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText textAlign="right">
              <h3>Still struggling?</h3>
              <p>
                Contact the registrar's office{' '}
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

        {/* Section II: FAQ/How to use the platform */}
        <EuiSpacer size="l" />
        <EuiText textAlign="center">
          <h2>Help and FAQ</h2>
        </EuiText>
        <EuiSpacer size="l" />
        <EuiFlexGroup style={head}>
          <EuiFlexItem>
            {/* A quick step-by-step guide to how to use the site */}
            <EuiText>
              <h3>How to use the site:</h3>
              <ol>
                <li>
                  Use the course lookup page to find courses by level, term,
                  subject, type, etc
                </li>
                <li>
                  Add the needed/desired courses to your cart by selecting them
                  in the lookup results
                </li>
                <li>
                  Generate a weekly calendar from your cart of courses by going
                  to the calendar page
                </li>
                <li>
                  Export your CRNs for registration on Banweb, and/or your
                  calendar for later use
                </li>
                <i>
                  Note: this site <strong>cannot</strong> be used to register,
                  you still have to use Banweb
                </i>
              </ol>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            {/* Bullet Pointed FAQ section, questions in italics */}
            <EuiText>
              <h3>FAQ:</h3>
              <ul>
                <i>Do I need an account?</i>
                <li>
                  No. To keep things simple and secure, this external app won't
                  collect any personal information or require user accounts.
                </li>
                <i>How do I search for courses on the website?</i>
                <li>
                  Use the combination of the dropdown menus, and search bar on
                  the lookup page to fine tune your search for a specific
                  course.
                </li>
                <i>Can I share my schedule with others on the website?</i>
                <li>
                  Yes, the generated calendar can be exported and shared or
                  integrated into your google account.
                </li>
                <i>
                  How frequently is the course information updated on the
                  website?
                </i>
                <li>
                  Course information is updated every day, and catalogs are
                  updated annually as the school releases them.
                </li>
                <i>
                  What should I do if I can't find a particular course on the
                  website?
                </i>
                <li>
                  If you can't find what you're looking for in the lookup,
                  please get in touch with the registrar's office, or try the
                  Banweb course offerings search, available{' '}
                  <a href="https://banweb7.nmt.edu/pls/PROD/hwzkcrof.p_uncgslctcrsoff">
                    here.
                  </a>
                </li>
                <i>
                  Is there a way to provide feedback or report errors on the
                  website?
                </i>
                <li>
                  Yes, there's a form for reporting issues, it can be found{' '}
                  <a href="./report">here.</a>
                </li>
              </ul>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
      </Wrapper>
    </>
  );
};

// rendering contents for display
export default Help;