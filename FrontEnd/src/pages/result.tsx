// Data and Imports
import { useEffect, useState } from 'react';
import {
  EuiBasicTable,
  EuiCheckbox,
  EuiToolTip,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiLink,
  EuiText,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiSpacer,
} from '@elastic/eui';
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

// --------

// Defining variables and managing data flow for displayed elements
const initialData = [
  {
    CRN: 12345,
    Course: 'DEPT 123',
    Title: 'Introduction to Computer Science',
    Instructor: 'Dr. Professor',
    Days: 'M W F',
    Time: '10:00-11:30',
    Location: 'Smith Hall',
    Catalog: 'https://catalog.nmt.edu/courses/DEPT123',
    Enroll: '18',
    Seats: '25',
    Waitlist: '0',
    isSelected: false,
  },
  {
    CRN: 23456,
    Course: 'DEPT 234',
    Title: 'Introduction to Philosophy',
    Instructor: 'Dr. Professor',
    Days: 'T R',
    Time: '13:00-14:30',
    Location: 'Online',
    Catalog: 'https://catalog.nmt.edu/courses/DEPT234',
    Enroll: '26',
    Seats: '40',
    Waitlist: '0',
    isSelected: false,
  },
  {
    CRN: 34567,
    Course: 'DEPT 345',
    Title: 'Introduction to Psychology',
    Instructor: 'Dr. Professor',
    Days: 'M W',
    Time: '08:00-09:30',
    Location: 'Johnson Hall',
    Catalog: 'https://catalog.nmt.edu/courses/DEPT345',
    Enroll: '4',
    Seats: '60',
    Waitlist: '0',
    isSelected: false,
  },
  {
    CRN: 45678,
    Course: 'DEPT 456',
    Title: 'Introduction to Biology',
    Instructor: 'Dr. Professor',
    Days: 'T Th',
    Time: '11:00-12:30',
    Location: 'Science Building',
    Catalog: 'https://catalog.nmt.edu/courses/DEPT456',
    Enroll: '21',
    Seats: '25',
    Waitlist: '0',
    isSelected: false,
  },
  {
    CRN: 56789,
    Course: 'DEPT 567',
    Title: 'Introduction to Economics',
    Instructor: 'Dr. Professor',
    Days: 'M W F',
    Time: '14:00-15:30',
    Location: 'Business Building',
    Catalog: 'https://catalog.nmt.edu/courses/DEPT567',
    Enroll: '4',
    Seats: '6',
    Waitlist: '0',
    isSelected: false,
  },
];

// --------

// building the page's actual composition and styling
// by returning a React component containing mostly EUI html
const Result = () => {
  // cart modal control
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  // indexing, sorting, selecting items Settings
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState('firstName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [pageOfItems, setPageOfItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState(initialData);
  const onTableChange = ({ page = {}, sort = {} }) => {
    const { index: pageIndex, size: pageSize } = page;
    const { field: sortField, direction: sortDirection } = sort;
    setPageIndex(pageIndex);
    setPageSize(pageSize);
    setSortField(sortField);
    setSortDirection(sortDirection);
  };

  // Managing checkbox selecting, starting by setting all to false
  const [isAllChecked, setIsAllChecked] = useState(false);
  const onAllCheckboxChange = () => {
    setIsAllChecked(!isAllChecked);
    const selectedIds = isAllChecked ? [] : pageOfItems.map(item => item.CRN);
    setSelectedItems(selectedIds);
  };

  // handling a change in selected items, keeping track of the CRNs
  const onItemCheckboxChange = itemCRN => {
    const isSelected = selectedItems.includes(itemCRN);
    const selectedIds = isSelected
      ? selectedItems.filter(id => id !== itemCRN)
      : [...selectedItems, itemCRN];
    setSelectedItems(selectedIds);
  };

  // handling when "add to cart" has been clicked
  // takes selected items, and adds them to user session variable
  // so that they can be access from the cart and the calendar
  const onAddButtonClick = () => {
    setIsModalVisible(true);
  };

  // Sorting logic for displayed data
  useEffect(() => {
    console.log('Triggered');
    let sortedArr = data.sort((x, y) => {
      var comp = x[sortField] < y[sortField];
      if (sortDirection == 'desc') {
        return comp ? 1 : -1;
      } else {
        return comp ? -1 : 1;
      }
    });
    setPageOfItems(
      sortedArr.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
    );
  }, [sortField, sortDirection, pageIndex, pageSize, data]); // add data to the dependencies array
  const totalItemCount = data.length;

  // --------

  // Establishing and styling columns and their associated data field.
  const columns = [
    {
      field: 'CRN',
      name: (
        <EuiToolTip content="The CRN, or id for the course">
          <span>CRN</span>
        </EuiToolTip>
      ),
      width: '64px',
      sortable: true,
      truncateText: true,
    },
    {
      field: 'Title',
      name: (
        <EuiToolTip content="The full name of the course">
          <span>Title</span>
        </EuiToolTip>
      ),
      sortable: true,
    },
    {
      field: 'Course',
      name: (
        <EuiToolTip content="The course code, dept + lvl">
          <span>Course</span>
        </EuiToolTip>
      ),
      sortable: true,
      truncateText: true,
    },
    {
      field: 'Instructor',
      name: (
        <EuiToolTip content="The teacher(s) of the course">
          <span>Instructor</span>
        </EuiToolTip>
      ),
      sortable: true,
      truncateText: true,
    },
    {
      field: 'Days',
      name: (
        <EuiToolTip content="The days of the week on which the course takes place">
          <span>Days</span>
        </EuiToolTip>
      ),
      sortable: true,
      truncateText: true,
    },
    {
      field: 'Time',
      name: (
        <EuiToolTip content="The time of day in which the course takes place">
          <span>Time</span>
        </EuiToolTip>
      ),
      sortable: true,
      truncateText: true,
    },
    {
      field: 'Location',
      name: (
        <EuiToolTip content="The building / medium where the class meets">
          <span>Location</span>
        </EuiToolTip>
      ),
      sortable: true,
      truncateText: true,
    },
    {
      field: 'Occupancy',
      name: (
        <EuiToolTip content="The number of taken/open spaces in the course">
          <span>Enrolled/Seats</span>
        </EuiToolTip>
      ),
      width: '100px',
      render: (occupancy, item) => (
        <EuiText>
          {item.Enroll} / {item.Seats}
        </EuiText>
      ),
    },
    {
      field: 'Waitlist',
      name: (
        <EuiToolTip content="The number of waitlist spaces taken">
          <span>Waitlist</span>
        </EuiToolTip>
      ),
      width: '64px',
      render: (waitlist, item) => <EuiText>{item.Waitlist}</EuiText>,
    },
    {
      field: 'Catalog',
      name: (
        <EuiToolTip content="The course catalog page">
          <span>Catalog</span>
        </EuiToolTip>
      ),
      render: (catalog, item) => (
        <EuiLink href={item.Catalog} target="_blank">
          Link
        </EuiLink>
      ),
    },
    {
      name: (
        <EuiCheckbox
          id="selectAllCheckbox"
          label="Select all rows"
          checked={isAllChecked}
          onChange={onAllCheckboxChange}
        />
      ),
      width: '32px',
      render: item => (
        <EuiCheckbox
          id={item.CRN.toString()}
          checked={selectedItems.includes(item.CRN)}
          onChange={() => onItemCheckboxChange(item.CRN)}
        />
      ),
    },
  ];

  // pagination settings for the table as a whole
  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalItemCount,
    pageSizeOptions: [5, 10, 15],
  };

  // more sorting configuration for columns
  const sorting = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  // building page content
  // combining and exporting components
  return (
    <div>
      {/* Render the actual table of search results */}
      <EuiBasicTable
        items={pageOfItems}
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        onChange={onTableChange}
      />

      {/* If there are selected items, show the directions and button to continue */}
      {selectedItems.length > 0 && (
        <EuiFlexGroup justifyContent="flexEnd">
          <EuiFlexItem>
            {/* Directions Label */}
            <EuiText>
              <h4 style={{ color: '#0079A5' }}>
                Step #4: Add Your Selections to Your Cart
                <strong>&#8594;</strong>
              </h4>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            {/* (conditional) Add to cart button */}
            <EuiButton onClick={onAddButtonClick}>
              Add selected {selectedItems.length > 1 ? 'items' : 'item'} to cart
            </EuiButton>
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
          </EuiFlexItem>
        </EuiFlexGroup>
      )}
    </div>
  );
};

// rendering contents for display
export default Result;