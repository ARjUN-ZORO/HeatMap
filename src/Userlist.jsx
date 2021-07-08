import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useTable, usePagination } from "react-table";
import { useStore } from "./store/store";
import { getData, removeUserData, setUser } from "./store/actions";
import { Modal } from "./Modal";
const Heading = styled.div`
  padding: 1rem 0 1rem 3rem;
`;

const TableDiv = styled.div`
  padding: 1rem 3rem;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  th,
  td {
    padding: 0.5rem;
    border: 1px solid #ddd;
  }
`;

const Button = styled.button.attrs((props) => ({}))`
  background-color: ${(props) => props.color};
  color: #fff;
  border-radius: 4px;
  border: none;
  padding: 0.3rem 0.5rem;
  margin: 4px 2px;
  cursor: pointer;
`;

const Select = styled.select`
  color: #595959;
  background-color: #d9d9d9;
  border: none;
  border-radius: 4px;
  width: 4rem;
  padding: 0.3rem 0.2rem;
  :active {
    border: none;
  }
`;

function Table({ columns, data, setPage, getData }) {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 5 },
      },
      usePagination
    );

  return (
    <>
      <TableDiv>
        <DataTable {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </DataTable>
      </TableDiv>
    </>
  );
}

const Userlist = () => {
  const { state, dispatch } = useStore();
  const [usersData, setusersData] = useState(state.userData);
  const [show, setShow] = useState(false);
  const closeModalHandler = () => setShow(false);
  const handleSelection = (e, id) => {
    if (e.target.value === "delete") {
      dispatch(removeUserData(id));
    } else if (e.target.value === "refresh") {
      dispatch(getData());
    } else if (e.target.value === "edit") {
      console.log(id);
      dispatch(setUser(state.userData[id].id));
      e.target.value = "";
      setShow(true);
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: (d) => `CAM_${d.id}`,
      },
      {
        Header: "Officer Name",
        accessor: (d) => `${d.first_name} ${d.last_name}`,
      },
      {
        Header: "Email Address",
        accessor: "email",
      },
      {
        Header: "Attendance",
        accessor: (d) => {
          let sum = 0;
          d.attendanceData.map((value) => (sum = sum + value.value));
          return sum % 100;
        },
      },
      {
        Header: "Status",
        accessor: "",
      },
      {
        Header: "Action",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <Button color="#0080ff">View More</Button>
              <Button color="#ff0066">View</Button>
              <Select
                name="actions"
                id="actions"
                onChange={(event) => handleSelection(event, rowIdx)}
              >
                <option value="">More</option>
                <option value="edit">Edit</option>
                <option value="delete">Delete</option>
                <option value="refresh">Refresh Data</option>
              </Select>
            </div>
          );
        },
      },
    ],
    [state]
  );
  useEffect(() => {
    setusersData(state.userData);
  }, [state]);

  return (
    <>
      <Heading>User List</Heading>
      <Table columns={columns} data={usersData} />
      <Modal show={show} close={closeModalHandler} />
    </>
  );
};

export default Userlist;
