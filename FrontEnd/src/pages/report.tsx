// Data and Imports
import { FunctionComponent } from 'react';
import Head from 'next/head';
import {
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiText,
  EuiFormRow,
  EuiFieldText,
  EuiDescribedFormGroup,
  EuiTextArea,
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
const Report: FunctionComponent = () => {
  // handling sending form data to the backend for email submission
  const handleFormSubmit = () => {
    const email = document.querySelector('reportEmail').value; // get email from input
    const message = document.querySelector('reportMessage').value; //get msg from input
    const subject = 'NMT Schedule Builder -- Issue Report'; // msg subject

    // data structure to send to backend
    const data = {
      email,
      message,
      subject,
    };

    // Making POST request to backend
    fetch('http://localhost:5000/submit_form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      // Managing responses
      .then(response => {
        if (response.ok) {
          alert('Report Form Submitted Successfully!');
        } else {
          alert(
            'Report Form Submission Failed Unexexpectedly with status ${response.status}'
          );
        }
      })

      // Managing errors
      .catch(error => {
        console.error('Report Form Submission Error:', error);
        alert('Form Submission Failed With ${error}');
      });
  };

  return (
    <>
      <Head>
        <title>Report an Issue</title>
      </Head>

      <Wrapper>
        <EuiSpacer size="m" />
        {/* Section I: Site Logo, Branding, and page information */}
        <EuiFlexGroup style={head}>
          <EuiFlexItem>
            <EuiText>
              <h3>Noticed a glitch or a bug?</h3>
              <p>
                Is something on the site causing issues? Please report your
                problem using the form below, or if it's more urgent, get in
                touch with the registrar's office{' '}
                <a href="https://www.nmt.edu/registrar/">here.</a>
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
              <h3>Let us know what's wrong</h3>
              <p>
                We want to ensure this site is working so that users can always
                access their schedule information
              </p>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />

        {/* Section II: Issue Reporting Form */}
        <EuiText textAlign="center">
          <h2>Error & Issue Report Form</h2>
        </EuiText>
        <EuiSpacer size="l" />
        <div>
          {/* email contact */}
          {/* small text entry field to collect contact info from reporters */}
          {/* in case a response is needed */}
          <EuiDescribedFormGroup
            title={<h3>Email</h3>}
            description={
              <h5>
                The best email address at which to reach you if we need some
                further information
              </h5>
            }>
            <EuiFormRow label="Email">
              <EuiFieldText
                name="Email"
                aria-label="user@example.com"
                placeholder="user@example.com"
                id="reportEmail"
              />
            </EuiFormRow>
          </EuiDescribedFormGroup>

          {/* Primary message body */}
          {/* large text entry field for the user's issue report */}
          <EuiDescribedFormGroup
            title={<h3>Report:</h3>}
            description={<h5>What's wrong and how can we help?</h5>}>
            <EuiFormRow label="Message">
              <EuiTextArea
                name="Message"
                aria-label="Questions, Comments, Concerns?"
                placeholder="Questions, Comments, Concerns?"
                id="reportMessage"
              />
            </EuiFormRow>
          </EuiDescribedFormGroup>

          {/* form submission button */}
          {/* uses mailto to send the input message, with a given subject line */}
          <EuiFlexGroup>
            <EuiFlexItem></EuiFlexItem>
            <EuiFlexItem></EuiFlexItem>
            <EuiFlexItem>
              <EuiButton
                size="s"
                color="primary"
                iconType="arrowRight"
                onClick={handleFormSubmit}>
                Send Report
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </Wrapper>
    </>
  );
};

// rendering contents for display
export default Report;
