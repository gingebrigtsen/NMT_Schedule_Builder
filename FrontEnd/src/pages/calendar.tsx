// Data and Imports
import { FunctionComponent, useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Head from 'next/head';
import {
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiText,
  EuiTitle,
  EuiButton,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
} from '@elastic/eui';
import Cal from './cal';
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
const Calendar: FunctionComponent = () => {
  // fetching usrCart session variable to display data
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/get_cart', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(response => {
        setData(response.items);
      });
  }, []);

  // handling exporting CRNs to clipboard
  const handleClick = async () => {
    // Join the CRNs with whitespace separation for pasting into banweb
    const formattedData = data.map(item => item.CRN).join(' ');

    try {
      // Use Clipboard API to write text to clipboard
      await navigator.clipboard.writeText(formattedData);

      // Alert user of copy success
      alert('Copy to Clipboard: Success');
    } catch (error) {
      // Alert user of copy failure
      alert('Copy to Clipboard: Failed');
    }

    // Close the modal after the status alert
    closeBanModal();
  };

  // Using react state hooks to manage the modals
  const [isCalModalVisible, setIsCalModalVisible] = useState(false);
  const [isBanModalVisible, setIsBanModalVisible] = useState(false);

  // controlling calendar modal
  const closeCalModal = () => {
    setIsCalModalVisible(false);
  };

  // controlling CRN modal
  const closeBanModal = () => {
    setIsBanModalVisible(false);
  };

  // --------

  // building page contents
  return (
    <>
      <Head>
        <title>My Course Calendar</title>
      </Head>

      <Wrapper>
        {/* Section I: Site Logo */}
        <EuiSpacer size="m" />
        <EuiFlexGroup css={head}>
          <EuiFlexItem>
            <EuiText>
              <h3>Your Term Calendar</h3>
              <p>
                View all your selected courses in an easy to read calendar
                format! Easily identify time conflicts and other issues.
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
              <h3>Keep on track</h3>
              <p>
                Update your cart at any time to automatically update the
                calendar here, and use the buttons below to export your CRNs to
                Banweb and register.
              </p>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />

        {/* Section II: Calendar Itself */}
        <EuiText textAlign="center">
          <h3>
            Your <i>Tentative</i> Course Calendar
          </h3>
          <p>
            *Note: this is not an official calendar, and you must still use
            Banweb to register
          </p>
          <p>
            *Note: you&apos;ll need to refresh the page to update the calendar
            if you make changes to your cart.
          </p>
        </EuiText>
        <EuiSpacer size="m" />
        <EuiFlexGroup css={head}>
          <EuiFlexItem>
            <Cal />
          </EuiFlexItem>
        </EuiFlexGroup>

        {/* Section III: Supplementary tools and Exporting CRNs */}
        <EuiText textAlign="center">
          <p>
            <i>Pssst!</i> Hover over events on the calendar to reveal more
            details.
          </p>
        </EuiText>
        <EuiSpacer size="m" />
        <EuiText textAlign="center">
          <h4>Exporting Your Schedule</h4>
        </EuiText>
        <EuiFlexGroup>
          <EuiFlexItem></EuiFlexItem>
          <EuiFlexItem>
            <EuiTitle size="xs" css={title}>
              <span>Tentative Schedule:</span>
            </EuiTitle>

            {/* Calendar Export Modal */}
            <EuiButton
              href=""
              size="s"
              color="primary"
              iconType="calendar"
              onClick={() => setIsCalModalVisible(true)}>
              Export Calendar
            </EuiButton>
            {isCalModalVisible && (
              <EuiModal css={head} onClose={closeCalModal} id="calModal">
                <EuiModalHeader>
                  <EuiModalHeaderTitle>
                    Exporting your Calendar
                  </EuiModalHeaderTitle>
                </EuiModalHeader>
                <EuiSpacer size="m" />
                <EuiModalBody>
                  <EuiText textAlign="center">
                    <h4>
                      The best way to save your calendar for later is to take a
                      screenshot/snip of it.
                    </h4>
                  </EuiText>
                </EuiModalBody>
                <EuiModalFooter>
                  <EuiButton
                    onClick={closeCalModal}
                    iconType="cross"
                    color="primary"
                    size="s"
                    fill>
                    Close
                  </EuiButton>
                </EuiModalFooter>
              </EuiModal>
            )}
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiTitle size="xs" css={title}>
              <span>Banweb Registration:</span>
            </EuiTitle>

            {/* Banweb Export Modal */}
            <EuiButton
              href=""
              size="s"
              color="primary"
              iconType="apmTrace"
              onClick={() => setIsBanModalVisible(true)}>
              Export CRNs
            </EuiButton>
            {isBanModalVisible && (
              <EuiModal css={head} onClose={closeBanModal} id="banModal">
                <EuiModalHeader>
                  <EuiModalHeaderTitle>
                    Exporting your CRNs for Registration
                  </EuiModalHeaderTitle>
                </EuiModalHeader>
                <EuiSpacer size="m" />
                <EuiModalBody>
                  <EuiText textAlign="center">
                    <h4>
                      Copy your selected CRNs, and enter them directly into
                      Banweb to register for courses.
                    </h4>
                    <p>
                      Find the fields to enter CRNs at Student and Financial Aid
                      / Registration / Add/Drop Classes
                    </p>
                    <p>
                      You can copy them directly, with the Copy to Clipboard
                      button below
                    </p>
                  </EuiText>
                </EuiModalBody>
                <EuiModalFooter>
                  <EuiButton
                    onClick={closeBanModal}
                    iconType="cross"
                    color="primary"
                    fill>
                    Close
                  </EuiButton>

                  <EuiButton
                    onClick={handleClick}
                    iconType="save"
                    color="primary">
                    Copy to Clipboard
                  </EuiButton>
                </EuiModalFooter>
              </EuiModal>
            )}
          </EuiFlexItem>
          <EuiFlexItem></EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="l" />
        <EuiSpacer size="l" />
        <EuiSpacer size="l" />
      </Wrapper>
    </>
  );
};

// rendering contents for display
export default Calendar;
