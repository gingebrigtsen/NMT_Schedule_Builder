// Data and Imports
import { FunctionComponent } from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiLink,
  EuiBottomBar,
} from '@elastic/eui';

// --------

// building the page's actual composition and styling
// by returning a React component containing mostly EUI html
const Footer: FunctionComponent = () => {
  return (
    <>
      <EuiBottomBar>
        <EuiFlexGroup justify="spaceBetween" alignItems="center">
          <EuiFlexItem grow={false}>
            {/* left side of the footer */}
            <EuiText size="s" color="subdued">
              Built for the students of NMT by the Registrar's Office & IT Dept
            </EuiText>
          </EuiFlexItem>

          {/* Central Spacer, open space for rights info, logo, etc */}
          <EuiFlexItem></EuiFlexItem>


          <EuiFlexItem grow={false}>
            {/* right side of the footer */}
            <EuiLink href="./report" target="_blank" rel="noopener">
              Report an Issue
            </EuiLink>
            <EuiLink href="https://www.nmt.edu" target="_blank" rel="noopener">
              Visit NMT's website
            </EuiLink>
            <EuiLink
              href="https://banweb7.nmt.edu/pls/PROD/twbkwbis.P_ValLogin"
              target="_blank"
              rel="noopener">
              Go to Banweb
            </EuiLink>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiBottomBar>
    </>
  );
};

// rendering contents for display
export default Footer;