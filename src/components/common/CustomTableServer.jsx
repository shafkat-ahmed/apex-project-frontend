import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";

const CustomTableServer = ({
  data = [],
  totalRows = 0,
  columns,
  onPageChange,
  onRowsPerPageChange,
  expandableRows,
  expandableRowsComponent,
  searchBy,
  filterPlaceholder = "Filter",
  filterOptions = [],
  fromPage,
  pageLength = 0,
  pageNumber = 0,
  onFilterChange = () => {},
  ...rest
}) => {
  const [filterText, setFilterText] = React.useState(null);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const debounceTimerRef = React.useRef(null);

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        filterPlaceholder={filterPlaceholder}
        filterOptions={filterOptions}
      />
    );
  }, [filterText, resetPaginationToggle, filterPlaceholder, ...filterOptions]);

  const customStyles = {
    table: {
      style: {
        borderWidth: 2,
        padding: 10,
      },
    },
    tableWrapper: {
      style: {
        display: "table",
      },
    },
    subHeader: {
      style: {
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "flex-end",
        padding: 0,
      },
    },
    header: {
      style: {
        height: "50px",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#492b74",
        color: "white",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        minHeight: "90px", // override the row height
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          // borderRightStyle: 'solid',
          // borderRightWidth: '1px',
          //borderRightColor: 'grey',
        },
        justifyContent: "center",
        text: "center",
        width: "200px",
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "0.1px",
          borderRightColor: "#dddd",
        },
        justifyContent: "center",
      },
    },
    subHeader: {
      style: {
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "flex-end",
        padding: 0,
      },
    },
  };

  console.log("rendered", columns);

  console.log("data", data);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      onFilterChange(filterText);
    }, 1000);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [filterText, onFilterChange]);

  return (
    <DataTable
      className="brand-list-table rounded-3 shadow-lg"
      columns={[
        {
          name: "Sl",
          selector: (row, index) => (pageNumber - 1) * pageLength + index + 1,
          sortable: true,
          width: "70px",
        },
        ...columns,
      ]}
      data={data}
      noHeader
      pagination={true}
      paginationServer
      paginationTotalRows={totalRows}
      paginationPerPage={pageLength > 0 ? pageLength : 10}
      paginationRowsPerPageOptions={[5, 10, 15, 20, 50, 100]}
      onChangePage={(page) => onPageChange && onPageChange(page)} // Trigger page change
      onChangeRowsPerPage={(rowsPerPage) =>
        onRowsPerPageChange && onRowsPerPageChange(rowsPerPage)
      } // Trigger rows per page change
      subHeader={true}
      subHeaderComponent={subHeaderComponentMemo}
      striped={true}
      center={true}
      responsive={true}
      customStyles={customStyles}
      expandableRows={expandableRows}
      expandableRowsComponent={expandableRowsComponent}
      {...rest}
    />
  );
};

export default CustomTableServer;
