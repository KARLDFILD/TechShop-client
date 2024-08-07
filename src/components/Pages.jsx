import { observer } from "mobx-react-lite";
import { Context } from "../main";
import Pagination from "@mui/material/Pagination";
import { useContext } from "react";
import { activeColor } from "../utils/const";
import "../index.css";

const Pages = observer(() => {
  const { device } = useContext(Context);
  const pageCount = Math.ceil(device.totalCount / device.limit);

  const handleChange = (event, value) => {
    device.setPage(value);
  };

  return (
    <Pagination
      className="mt-4"
      sx={{
        "& .Mui-selected": {
          backgroundColor: `${activeColor} !important`,
          color: "white !important",
        },
      }}
      count={pageCount}
      page={device.page}
      onChange={handleChange}
      color="primary"
    />
  );
});

export default Pages;
