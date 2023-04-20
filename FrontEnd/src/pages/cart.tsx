// Data and Imports
import React, { useEffect, useState } from 'react';
import {
  EuiBasicTable,
  EuiCheckbox,
  EuiToolTip,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from '@elastic/eui';

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
  // define initial data as a constant
  {
    CRN: 12345,
    Course: 'DEPT 123',
    Campus: 'Main',
    Days: 'M W F',
    Time: '10:00-11:30',
    Location: 'Smith Hall',
    isSelected: false,
    cF: false,
  },
  {
    CRN: 23456,
    Course: 'DEPT 234',
    Campus: 'Distance',
    Days: 'T R',
    Time: '13:00-14:30',
    Location: 'Online',
    isSelected: false,
    cF: true,
  },
  {
    CRN: 34567,
    Course: 'DEPT 345',
    Campus: 'Main',
    Days: 'M W',
    Time: '08:00-09:30',
    Location: 'Johnson Hall',
    isSelected: false,
    cF: false,
  },
];

// styling conflicting rows to be clearly visible to users
// using conditional css based on cF flag
const rowStyle = item => {
  if (item.cF) {
    return {
      border: '1px solid red',
      backgroundColor: 'lightcoral',
    }
  }
  return {}
};

// --------

// building the page's actual composition and styling
// by returning a React component containing mostly EUI html
const Cart = () => {
  // modal configuration
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  // indexing, sorting, selecting items Settings
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState('firstName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [pageOfItems, setPageOfItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState(initialData); // define data as a state variable
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

  // handling when "delete" has been clicked
  // takes selected items, removes from display & ession variable
  // so that they can be access from the cart and the calendar
  const onDeleteButtonClick = () => {
    const newData = data.filter(item => !selectedItems.includes(item.CRN));
    setData(newData);
    setSelectedItems([]);
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
      sortable: true,
      truncateText: true,
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
      field: 'Campus',
      name: (
        <EuiToolTip content="The campus, eg Main, Distance/Web">
          <span>Campus</span>
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
      {/* Render the actual table of selected courses */}
      <EuiBasicTable
        items={pageOfItems}
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        onChange={onTableChange}
        // Changing display style, if there's a conflict among data
        rowProps={item => ({ style: rowStyle(item) })}
      />

      {/* If there are selected items, show the button to continue */}
      {selectedItems.length > 0 && (
        <EuiFlexGroup justifyContent="flexEnd">
          <EuiFlexItem grow={false}>
            <EuiButton onClick={onDeleteButtonClick}>
              Delete selected {selectedItems.length > 1 ? 'items' : 'item'}
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      )}
      <i>To remove an item from your cart, select it, and click Delete.</i>
    </div>
  );
};

// rendering contents for display
export default Cart;
