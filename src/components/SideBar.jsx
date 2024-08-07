import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../main";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { activeColor } from "../utils/const";

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  const sortedTypes = [...device.types].sort((a, b) => a.id - b.id);
  const sortedBrands = [...device.brands].sort((a, b) => a.id - b.id);

  const handleTypeClick = (type) => {
    if (device.selectedType.id === type.id) {
      device.setSelectedType({});
    } else {
      device.setSelectedType(type);
    }
  };

  const handleBrandClick = (brand) => {
    if (device.selectedBrand.id === brand.id) {
      device.setSelectedBrand({});
    } else {
      device.setSelectedBrand(brand);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Accordion>
        <AccordionSummary aria-controls="panel1-content" id="panel1-header">
          <Typography>Типы техники</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListGroup>
            {sortedTypes.map((type) => {
              const active = type.id === device.selectedType.id;
              return (
                <ListGroupItem
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                    backgroundColor: active ? activeColor : "white",
                    color: active ? "white" : "black",
                  }}
                  onClick={() => handleTypeClick(type)}
                  key={type.id}
                >
                  {type.name}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary aria-controls="panel2-content" id="panel2-header">
          <Typography>Брэнды</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListGroup>
            {sortedBrands.map((brand) => {
              const active = brand.id === device.selectedBrand.id;
              return (
                <ListGroupItem
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                    backgroundColor: active ? activeColor : "white",
                    color: active ? "white" : "black",
                  }}
                  onClick={() => handleBrandClick(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  );
});

export default TypeBar;
