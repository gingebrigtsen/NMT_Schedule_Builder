// Data and Imports
import React, { FunctionComponent, useState } from 'react';
import Head from 'next/head';
import {
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiText,
  EuiHorizontalRule,
  EuiFieldSearch,
  EuiButton,
  EuiTitle,
} from '@elastic/eui';
import { EuiSelectable, EuiSelectableOption } from '@elastic/eui';
import Wrapper from '../components/starter/wrapper';
import Result from './result';
import Cart from './cart';

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
// vertical lines for better readability
const vert = {
  borderLeft: '1px solid #666666',
  margin: 'auto 8px',
};

// --------

// building the page's actual composition and styling
// by returning a React component containing mostly EUI html
const Lookup: FunctionComponent = () => {
  // defining variables used as search options
  // terms, subjects, and levels all predefined
  // The available options for NMT terms
  // uses React useState to control selected options
  const [terms, setTerms] = useState<EuiSelectableOption[]>([
    {
      label: 'Spring 2023',
    },
    {
      label: 'Summer 2023',
    },
    {
      label: 'Fall 2023',
    },
  ]);

  // The available options for course subjects
  // uses React useState to control selected options
  const [subjects, setSubjects] = useState<EuiSelectableOption[]>([
    {
      label: 'Accounting ACCT',
    },
    {
      label: 'Aerospace Engineering AE',
    },
    {
      label: 'Air Force Aerospace Studies AFAS',
    },
    {
      label: 'Art History ARTH',
    },
    {
      label: 'Art Studio ARTS',
    },
    {
      label: 'Biology BIOL',
    },
    {
      label: 'Biomedical Sciences BMS',
    },
    {
      label: 'Biotechnology BIOT',
    },
    {
      label: 'Certifications CERT',
    },
    {
      label: 'Chemical Engineering CH E',
    },
    {
      label: 'Chemistry CHEM',
    },
    {
      label: 'Civil and Environmental Engineering CE',
    },
    {
      label: 'Communication COMM',
    },
    {
      label: 'Community Education Non Credit CED',
    },
    {
      label: 'Computer Science & Engineering CSE',
    },
    {
      label: 'Cybersecurity CYBS',
    },
    {
      label: 'Economics ECON',
    },
    {
      label: 'Education EDUC',
    },
    {
      label: 'Electrical Engineering EE',
    },
    {
      label: 'Engineering Management EMGT',
    },
    {
      label: 'Engineering Science ES',
    },
    {
      label: 'English ENGL',
    },
    {
      label: 'Environmental Science ENVS',
    },
    {
      label: 'Exchange EXCH',
    },
    {
      label: 'Explosives Engineering EXPL',
    },
    {
      label: 'Film and Media FDMA',
    },
    {
      label: 'Finance FIN',
    },
    {
      label: 'Geobiology GEOB',
    },
    {
      label: 'Geochemistry GEOC',
    },
    {
      label: 'Geology GOEL',
    },
    {
      label: 'Geophysics GEOP',
    },
    {
      label: 'German GRMN',
    },
    {
      label: 'Graduate Cross Enrollment GEX',
    },
    {
      label: 'History HIST',
    },
    {
      label: 'Hydrology HYD',
    },
    {
      label: 'Information Technology IT',
    },
    {
      label: 'Intersession INTR',
    },
    {
      label: 'Lifestyle Activities LIFE',
    },
    {
      label: 'Management MGMT',
    },
    {
      label: 'Marketing MKT',
    },
    {
      label: 'Materials Engineering MTLS',
    },
    {
      label: 'Mathematics MATH',
    },
    {
      label: 'Mechanical Engineering MENG',
    },
    {
      label: 'Mineral Engineering ME',
    },
    {
      label: 'Music Art MUSC',
    },
    {
      label: 'Music Performance MUS',
    },
    {
      label: 'Optics OPT',
    },
    {
      label: 'Petroleum Engineering PETR',
    },
    {
      label: 'Philosophy PHIL',
    },
    {
      label: 'Physical Education PHED',
    },
    {
      label: 'Physics PHYS',
    },
    {
      label: 'Political Science POLS',
    },
    {
      label: 'Portuguese PORT',
    },
    {
      label: 'Psychology PSYC',
    },
    {
      label: 'Public Communication PCOM',
    },
    {
      label: 'STEM STEM',
    },
    {
      label: 'Science Teaching ST',
    },
    {
      label: 'Social Science SOSC',
    },
    {
      label: 'Spanish SPAN',
    },
    {
      label: 'Technical Communication TCOM',
    },
    {
      label: 'Theater THEA',
    },
    {
      label: "Women's and Gender Studies WGS",
    },
  ]);

  // The available options for course levels
  // uses React useState to control selected options
  const [levels, setLevels] = useState<EuiSelectableOption[]>([
    {
      label: '0000 Lvl Pilot/Misc.',
    },
    {
      label: '1000 Lvl Freshman',
    },
    {
      label: '2000 Lvl Sophomore',
    },
    {
      label: '3000 Lvl Junior',
    },
    {
      label: '4000 Lvl Senior',
    },
    {
      label: '5000 Lvl Graduate',
    },
  ]);

  // tracking search bar contents
  const [query, setQuery] = useState('');
  // update query state when something is typed in
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // defining inter-component results data structure
  const [data, setData] = useState([]);
  // On form submission, package data for backend to run search
  const handleSearchSubmit = () => {
    // create data object of search query and selected options
    const data = {
      query: query,
      terms: terms.filter(option => option.checked),
      subjects: subjects.filter(option => option.checked),
      levels: levels.filter(option => option.checked),
    };

    // Making a POST to the backend
    fetch('http://localhost:5000/serve_query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      // Managing responses (search results or errors)
      .then(response => response.json())
      .then(data => {
        // debugging purposes
        console.log('Search results:', data);
        // updating data state with search results
        setData(data)
      })

      // catching errors and logging to console
      .catch(error => {
        console.error('Error searching:', error);
      });
  };

  // building page content
  return (
    <>
      <Head>
        <title>NMT Course Lookup</title>
      </Head>

      <Wrapper>
        <EuiSpacer size="l" />
        {/* Section I: Site Logo, Branding, and page information */}
        <EuiFlexGroup style={head}>
          <EuiFlexItem>
            <EuiText>
              <h3>NMT Course Lookup</h3>
              <p>
                Search by term, department, type/location, instructor, etc. Find
                the right classes for you and your degree program here!
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
              <h3>Create your schedule</h3>
              <p>
                Add courses to your cart to keep track of them, and track them
                on your calendar -- lookout for time conflicts.
              </p>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />

        {/* Section II: Search and lookup*/}
        <EuiText textAlign="center">
          <h3>Course Lookup</h3>
        </EuiText>
        <EuiSpacer size="m" />

        {/* Search option 1: selectables */}
        <EuiText>
          <h4 style={{ color: '#0079A5' }}>
            Search Option 1 (Specify the Term, Subject, and Level) 
            <strong>&#8628;</strong>
          </h4>
        </EuiText>
        <EuiFlexGroup justifyContent="spaceBetween" style={{ height: 200 }}>
          {/* term selection */}
          <EuiFlexItem style={vert}>
            <EuiTitle size="xxs" style={title}>
              <span>Term</span>
            </EuiTitle>
            <EuiSelectable
              aria-label="termSelection"
              options={terms}
              onChange={newTerms => setTerms(newTerms)}>
              {list => <>{list}</>}
            </EuiSelectable>
          </EuiFlexItem>

          {/* dept selection */}
          <EuiFlexItem style={vert}>
            <EuiTitle size="xxs" style={title}>
              <span>Subject / Program</span>
            </EuiTitle>
            <EuiSelectable
              aria-label="termSelection"
              options={subjects}
              onChange={newSubjects => setSubjects(newSubjects)}>
              {list => <>{list}</>}
            </EuiSelectable>
          </EuiFlexItem>

          {/* level selection */}
          <EuiFlexItem style={vert}>
            <EuiTitle size="xxs" style={title}>
              <span>Course Level</span>
            </EuiTitle>
            <EuiSelectable
              aria-label="termSelection"
              options={levels}
              onChange={newOptions => setLevels(newOptions)}>
              {list => <>{list}</>}
            </EuiSelectable>
          </EuiFlexItem>
        </EuiFlexGroup>

        {/* Search Option 2: term + general search */}
        <EuiSpacer size="m" />
        <EuiHorizontalRule margin="s" size="half" />
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem>
            <EuiText>
              <h4 style={{ color: '#0079A5' }}>
                Search Option 2 (Specify the term, & Search for a phrase over all course listings)<strong>&#8594;</strong>
              </h4>
            </EuiText>
          </EuiFlexItem>

          {/* term selection for option 2 */}
          <EuiFlexItem style={vert}>
            <EuiTitle size="xxs" style={title}>
              <span>Term</span>
            </EuiTitle>
            <EuiSelectable
              aria-label="termSelection"
              options={terms}
              onChange={newTerms => setTerms(newTerms)}>
              {list => <>{list}</>}
            </EuiSelectable>
          </EuiFlexItem>

          {/* general global searching search */}
          <EuiFlexItem style={vert}>
            <EuiFieldSearch
              placeholder="Search for Anything..."
              aria-label="Search"
            />
          </EuiFlexItem>
        </EuiFlexGroup>

        {/* submit lookup form */}
        <EuiHorizontalRule margin="s" size="half" />
        <EuiSpacer size="m" />
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem>
            <EuiText>
              <h4 style={{ color: '#0079A5' }}>
                Click search to get your results<strong>&#8594;</strong>
              </h4>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButton
              size="s"
              color="primary"
              iconType="search"
              onClick={handleSearchSubmit}>
              Search
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem></EuiFlexItem>
        </EuiFlexGroup>
        <EuiHorizontalRule margin="s" size="half" />

        {/* Section III: Search results table */}
        <EuiText textAlign="center">
          <h3>Your Results:</h3>
        </EuiText>
        <EuiText>
          <h4 style={{ color: '#0079A5' }}>
            Select your chosen courses using the checkboxes<strong>&#8594;</strong>
          </h4>
        </EuiText>
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem>
            <Result />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
      </Wrapper>
    </>
  );
};

// rendering contents for display
export default Lookup;
