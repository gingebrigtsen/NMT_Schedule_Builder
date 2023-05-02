// Data and Imports
import React, { FunctionComponent, useState, useEffect } from 'react';
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
const Lookup: FunctionComponent = () => {
  // defining variables used as search options
  // terms, subjects, and levels all predefined
  // The available options for NMT terms
  // uses React useState to control selected options
  const [terms, setTerms] = useState<EuiSelectableOption[]>([]);

  // The available options for course subjects
  // uses React useState to control selected options
  const [subjects, setSubjects] = useState<EuiSelectableOption[]>([]);

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

  // populating search options from up-to-date config
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/conf.json');
        const data = await response.json();

        // Convert and set terms data
        const newTerms = data.p_term.map((item: any) => ({
          label: item[0],
        }));
        setTerms(newTerms);

        // Convert and set subjects data
        const newSubjects = data.p_subj.map((item: any) => ({
          label: `${item[0]} ${item[1]}`,
        }));
        setSubjects(newSubjects);
      } catch (error) {
        console.error("Error fetching conf.json data:", error);
      }
    };

    fetchData();
  }, []);
  // tracking search bar contents
  const [query, setQuery] = useState('');
  // update query state when something is typed in
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // defining inter-component results data structure
  const [result, setResult] = useState([]);
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
    fetch('http://localhost:5000/api/serve_query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      // Managing responses (search results or errors)
      .then(response => {
        console.log('Response headers:', response.headers);
        return response.json();
      })
      .then(data => {
        // debugging purposes
        console.log('Search results:', data);
        // updating data state with search results
        setResult(data);
      })

      // catching errors and logging to console
      .catch(error => {
        console.error('Error searching:', error);
      });

    const resultsElement = document.getElementById('resultElement');
    // scroll to show results better
    if (resultsElement) {
      setTimeout(() => {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    } else {
      console.error('Failed to find element with id "resultElement"');
    }
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
            Search Option 1 (Specify the Term, and search for a Subject, and/or
            Level)
            <strong>&#8628;</strong>
          </h4>
        </EuiText>
        <EuiFlexGroup justifyContent="spaceBetween" style={{ height: 200 }}>
          {/* term selection */}
          <EuiFlexItem >
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
          <EuiFlexItem >
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
          <EuiFlexItem >
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
                Search Option 2 (Specify the term, & Search for a phrase over
                all course listings)<strong>&#8594;</strong>
              </h4>
            </EuiText>
          </EuiFlexItem>

          {/* term selection for option 2 */}
          <EuiFlexItem >
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
          <EuiFlexItem >
            <EuiFieldSearch
              placeholder="Search for Anything..."
              aria-label="Search"
              onChange={handleSearchChange}
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
          <EuiFlexItem id="resultElement">
            <Result resultData={result} />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="l" />
        <EuiSpacer size="l" />
        <EuiSpacer size="l" />
      </Wrapper>
    </>
  );
};

// rendering contents for display
export default Lookup;