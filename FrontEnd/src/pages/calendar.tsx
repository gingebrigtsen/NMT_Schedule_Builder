// Data and Imports
import { FunctionComponent, useState } from 'react';
import Head from 'next/head';
import {
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiText,
  EuiTitle,
  EuiButton,
  EuiButtonEmpty,
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
const head = {
  borderRadius: '25px',
  border: '1px solid #666666',
  padding: '5px',
  top: 'auto',
  bottom: 'auto',
};
// small bold title font
const title = {
  lineHeight: '1.75',
};

// --------

// building the page's actual composition and styling
// by returning a React component containing mostly EUI html
const Calendar: FunctionComponent = () => {
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
        <EuiFlexGroup style={head}>
          <EuiFlexItem>
            <EuiText>
              <h3>Your Term Calendar</h3>
              <p>
                View all your selected courses in an easy to read calendar
                format! Easily identify time conflicts or other issues, and
                easily export to online calendars
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
              <h3>Keep on track</h3>
              <p>
                Update your cart at any time to automatically update the
                calendar here, and use the options below to control details and
                exporting
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
        </EuiText>
        <EuiSpacer size="m" />
        <EuiFlexGroup style={head}>
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
            <EuiTitle size="xxs" style={title}>
              <span>Tentative Schedule:</span>
            </EuiTitle>

            {/* Calendar Export Modal */}
            <EuiButton
              href=""
              size="xs"
              color="primary"
              iconType="calendar"
              htmlFor="calModal"
              onClick={() => setIsCalModalVisible(true)}>
              Export Calendar
            </EuiButton>
            {isCalModalVisible && (
              <EuiModal style={head} onClose={closeCalModal} id="calModal">
                <EuiModalHeader>
                  <EuiModalHeaderTitle>
                    Exporting your Calendar
                  </EuiModalHeaderTitle>
                </EuiModalHeader>
                <EuiSpacer size="m" />
                <EuiModalBody>
                  <EuiText textAlign="center">
                    <h4>
                      *The recommended way to save your calendar is to take a
                      screenshot.
                    </h4>
                    <p>
                      However, should you wish to use this calendar elsewhere
                      online, you can export it using the button below.
                    </p>
                  </EuiText>
                </EuiModalBody>
                <EuiModalFooter>
                  <EuiButton
                    onClick={closeCalModal}
                    iconType="cross"
                    color="primary"
                    fill>
                    Close
                  </EuiButton>

                  <EuiButton
                    href="./export"
                    iconType="download"
                    color="primary">
                    Export
                  </EuiButton>
                </EuiModalFooter>
              </EuiModal>
            )}
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiTitle size="xxs" style={title}>
              <span>Banweb Registration:</span>
            </EuiTitle>

            {/* Banweb Export Modal */}
            <EuiButton
              href=""
              size="xs"
              color="primary"
              iconType="apmTrace"
              htmlFor="banModal"
              onClick={() => setIsBanModalVisible(true)}>
              Export CRNs
            </EuiButton>
            {isBanModalVisible && (
              <EuiModal style={head} onClose={closeBanModal} id="banModal">
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
                      Find the fields to enter CRNs at "Student and Financial Aid" / "Registration" / "Add/Drop Classes"
                    </p>
                    <p>
                      You can copy them directly, with the 'Copy to Clipboard'
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

                  <EuiButton href="./export" iconType="save" color="primary">
                    Copy to Clipboard
                  </EuiButton>
                </EuiModalFooter>
              </EuiModal>
            )}
          </EuiFlexItem>
          <EuiFlexItem></EuiFlexItem>
        </EuiFlexGroup>
      </Wrapper>
    </>
  );
};

// rendering contents for display
export default Calendar;