import React from "react";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";

const Table = ({ data, columns, sortColumn, onSort }) => {
  return (
    <table className="table table-striped">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
