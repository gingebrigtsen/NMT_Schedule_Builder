// Data and Imports
import React, { useEffect, useState } from 'react';
import {
  CriteriaWithPagination,
  EuiBasicTable,
  EuiCheckbox,
  EuiToolTip,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from '@elastic/eui';

// --------

// styling conflicting rows to be clearly visible to users
// using conditional css based on cF flag
const rowStyle = item => {
  if (item.cF) {
    return {
      border: '1px solid red',
      backgroundColor: 'lightcoral',
    };
  }
  return {};
};

// --------

interface TableItem {
  CRN: number;
  Course: string;
  '*Campus': string;
  Days: string;
  Time: string;
  Location: string;
}

// building the page's actual composition and styling
// by returning a React component containing mostly EUI html
const Cart = () => {
  // modal configuration
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  // indexing, sorting, selecting items Settings
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState<keyof TableItem>('CRN');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [pageOfItems, setPageOfItems] = useState<TableItem[]>([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // fetching usrCart session variable to display data
  const [data, setData] = useState<TableItem[]>([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/get_cart', {
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(response => {
        if ('items' in response) {
          setData(response.items);
        } else {
          setData([]);
        }
        console.log('Selected results:', data);
      })
      .catch(error => {
        console.error('Failed to fetch from get_cart:', error);
      });
  }, [data]);

  // Updating table on change
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
  const onSelectAllChange = () => {
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
    // removing data from rendered element
    const newData = data.filter(item => !selectedItems.includes(item.CRN));
    setData(newData);

    // actually removing data from cart session var
    const delItems = data.filter(item => selectedItems.includes(item.CRN));
    setSelectedItems([]);

    // utilizing backend endpoint to del list from session variable
    fetch('http://localhost:5000/api/del_cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ delItems }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(response => {
        console.log('Items removed from cart:', response);
      })
      .catch(error => {
        console.error('Failed to fetch del_cart:', error);
      });
  };

  // handling when delete all has been clicked
  const onClearButtonClick = () => {
    fetch('http://localhost:5000/api/clear_cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Failed to fetch del_cart:', error);
      });

    // clear displayed data now that cart is clear
    setSelectedItems([]);
    setData([]);
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
  const totalItemCount = data ? data.length : 0;

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
    },
    {
      field: '*Campus',
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
    },
    {
      name: (
        <EuiCheckbox
          id="selectAllCheckbox"
          label="Select all rows"
          checked={isAllChecked}
          onChange={onSelectAllChange}
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
      <EuiButton color="danger" onClick={onClearButtonClick}>
        Delete all items
      </EuiButton>
      <br />
      <i>Red entries indicate a time conflict among your selections.</i>
      <br />
      <i>
        To remove an item from your cart, select it, and click Delete Item(s).
      </i>
      <br />
      <i>
        Delete all items will remove <strong>ALL</strong> items from your cart
        (Not Recommended).
      </i>
    </div>
  );
};

// rendering contents for display
export default Cart;
