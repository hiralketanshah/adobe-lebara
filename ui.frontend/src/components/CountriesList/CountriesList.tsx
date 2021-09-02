import React from "react";
import { Table, Tbody, Td, Tr, useBreakpointValue } from "@chakra-ui/react";
import { CountriesListOption, CountriesListProps } from "./types";
import CountryWithFlag from "../CountryWithFlag/CountryWithFlag";

const CountriesList: React.FC<CountriesListProps> = ({ items }) => {
  const cols = useBreakpointValue({ base: 2, md: 4 }) || 2;
  const rows: CountriesListOption[][] = items.reduce(
    (rowsData: any[], key, index) =>
      (index % cols === 0
        ? rowsData.push([key])
        : rowsData[rowsData.length - 1].push(key)) && rowsData,
    []
  );
  return (
    <Table variant="simple">
      <Tbody>
        {rows.map((row) => (
          <Tr borderTop={1}>
            {row.map((col: CountriesListOption, i: number) => (
              <Td
                border="1px solid #D6D6D6"
                borderRight={
                  (row.length > 2 && i % 2 === 0) || i === row.length - 1
                    ? ""
                    : "1px solid #D6D6D6"
                }
                paddingX={9}
                paddingY={1.5}
              >
                <CountryWithFlag
                  countryName={col.countryName}
                  countryFlag={col.countryFlag}
                />
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CountriesList;
