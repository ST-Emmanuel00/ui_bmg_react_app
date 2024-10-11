import { useState } from "react";
import { Container } from "../common/Container";
import { Accordion } from "./Accordion";

interface Table {
  number: number;
  description: string;
}

export const TablesSection = () => {
  const [tables, setTables] = useState<Table[]>([]); // Simulación de mesas

  return (

    <Accordion title="Assigned Tables" isLoading={false} >
        {tables.length === 0 ? (
          <p className="text-gray-600 mt-2 text-left">No tienes mesas a cargo.</p>
        ) : (
          <div className="">
            {tables.map((table, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700">Mesa {table.number}</h3>
                <p className="text-sm text-gray-600">{table.description}</p>
              </div>
            ))}
          </div>
        )}
      
    </Accordion>
  );
};
