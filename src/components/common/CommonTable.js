import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const CommonTable = ({ data, columns }) => {
  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableHiding: false,
    enableFullScreenToggle: false,
    paginationDisplayMode: "pages",
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default CommonTable;
