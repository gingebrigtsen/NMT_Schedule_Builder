// Data and Imports
import { useEffect, useState } from 'react';
import {
  CriteriaWithPagination,
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

interface TableItem {
  CRN: number;
  Title: string;
  Course: string;
  Instructor: string;
  Days: string;
  Time: string;
  Location: string;
  Occupancy: string;
  Enroll: number;
  Seats: number;
  Waitlist: number;
  Catalog: string;
}

// building the page's actual composition and styling
// by returning a React component containing mostly EUI html
const Result = ({ resultData }) => {
  // cart modal control
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedItems([]);
  };

  // indexing, sorting, selecting items Settings
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<keyof TableItem>('Title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedItems, setSelectedItems] = useState([]);

  // getting data from parent component
  const [data, setData] = useState(resultData || []);
  // keeping data updated
  useEffect(() => {
    setData(resultData);
  }, [resultData]);
  // inserting data into table
  const [pageOfItems, setPageOfItems] = useState(data);

  // handle table changes
  const onTableChange = ({
    page = { index: pageIndex, size: pageSize },
    sort = { field: sortField, direction: sortDirection },
  }: CriteriaWithPagination<TableItem>) => {
    const { index: newPageIndex, size: newPageSize } = page;
    const { field: newSortField, direction: newSortDirection } = sort;

    setPageIndex(newPageIndex);
    setPageSize(newPageSize);

    setSortField(newSortField);
    setSortDirection(newSortDirection);
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
    // collect a list of selected results
    const addItems = selectedItems.map(itemId => {
      // match item by CRN
      return data.find(item => item.CRN === itemId);
    });

    // utilizing backend endpoint to add list to session variable
    fetch('http://localhost:5000/api/add_to_cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ addItems }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(response => {
        console.log('Items added to cart:', response);
      })
      .catch(error => {
        console.error('Failed to fetch in add_to_cart:', error);
      });

    // opening the cart modal after populating cart
    setTimeout(() => {
      setIsModalVisible(true);
    }, 1000);
  };

  // Sorting logic for displayed data
  useEffect(() => {
    console.log('Triggered');
    const sortedArr = data.sort((x, y) => {
      const comp = x[sortField] < y[sortField];
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
    },
    {
      field: 'Instructor',
      name: (
        <EuiToolTip content="The teacher(s) of the course">
          <span>Instructor</span>
        </EuiToolTip>
      ),
      sortable: true,
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
    pageSizeOptions: [10, 20],
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
                Finally, add your selections to your cart
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
      <EuiSpacer size="m" />
      <EuiSpacer size="m" />
    </div>
  );
};

// rendering contents for display
export default Result;
