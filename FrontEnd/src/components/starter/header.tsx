// Data and Imports
import React, { useState } from 'react';
import Link from 'next/link';
import {
  EuiHeader,
  EuiTitle,
  useEuiTheme,
  EuiHeaderSectionItem,
  EuiHeaderLink,
  EuiSpacer,
  EuiButton,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
} from '@elastic/eui';
import ThemeSwitcher from './theme_switcher';
import { headerStyles } from './header.styles';
import Cart from '../../pages/cart';

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
const Header = () => {
  // defining theme, and state variables for the cart modal
  const { euiTheme } = useEuiTheme();
  const styles = headerStyles(euiTheme);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);

  // building contents
  return (
    <EuiHeader
      position="fixed"
      sections={[
        {
          // Navigation items inside the header
          items: [
            // Link to the homepage embedded in simple text logo
            <Link key="logo-eui" href="/" passHref>
              <a>
                <EuiTitle size="xxs" css={styles.title}>
                  <span>NMT Schedule Builder</span>
                </EuiTitle>
              </a>
            </Link>,
            <EuiHeaderSectionItem key="links" border="right">
              {/* Home page link */}
              <EuiHeaderLink iconType="apps" href="./" color="primary">
                Home
              </EuiHeaderLink>

              {/* Course Lookup Link */}
              <EuiHeaderLink iconType="search" href="./lookup" color="primary">
                Course Lookup
              </EuiHeaderLink>

              {/* Calendar Link */}
              <EuiHeaderLink
                iconType="calendar"
                href="./calendar"
                color="primary">
                My Calendar
              </EuiHeaderLink>

              {/* Cart Modal Button/Link */}
              <EuiHeaderLink
                iconType="folderOpen"
                onClick={() => setIsModalVisible(true)}
                color="primary">
                My Cart
              </EuiHeaderLink>
              {isModalVisible && (
                // Actual Modal Body for the cart contents
                <EuiModal style={head} onClose={closeModal}>
                  {/* title */}
                  <EuiModalHeader>
                    <EuiModalHeaderTitle>
                      Your Cart of Courses:
                    </EuiModalHeaderTitle>
                  </EuiModalHeader>
                  <EuiSpacer size="m" />

                  {/* Displaying selected courses */}
                  <EuiModalBody>
                    <Cart />
                  </EuiModalBody>

                  {/* Closing the modal */}
                  <EuiModalFooter>
                    <EuiButton
                      onClick={closeModal}
                      iconType="cross"
                      color="primary"
                      fill>
                      Continue Building
                    </EuiButton>

                    <EuiButton
                      href="./calendar"
                      iconType="indexOpen"
                      color="primary">
                      View on My Calendar
                    </EuiButton>
                  </EuiModalFooter>
                </EuiModal>
              )}
            </EuiHeaderSectionItem>,
          ],
          borders: 'none',
        },
        // configuration for dark/light mode theme switching
        {
          items: [
            <ThemeSwitcher key="theme-switcher" />,
            <EuiHeaderSectionItem key="links" border="right">
              <EuiHeaderLink
                iconType="plusInCircleFilled"
                href="./about"
                color="primary">
                About
              </EuiHeaderLink>

              <EuiHeaderLink
                iconType="questionInCircle"
                href="./help"
                color="primary">
                Help
              </EuiHeaderLink>
            </EuiHeaderSectionItem>,
          ],
          borders: 'none',
        },
      ]}
    />
  );
};

// rendering contents for display
export default Header;
