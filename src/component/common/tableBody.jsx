import React, { Component } from "react";
import { get } from "lodash-es";

// movies: items
class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns, targetId } = this.props;
    return (
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item[targetId]}>
              {columns.map((column) => (
                <td key={this.createKey(item, column)}>{this.renderCell(item, column)}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

TableBody.defaultProps = {
  targetId: "_id",
};

export default TableBody;
