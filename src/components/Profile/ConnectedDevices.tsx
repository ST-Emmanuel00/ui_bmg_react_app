import { Container } from "../common/Container";
import { Accordion } from "./Accordion";

export const ConnectedDevices = () => {
  return (
    <Accordion title="Connected Devices" isLoading={false}>

      <div className="space-y-2"> {/* Contenedor agregado para los dispositivos */}
        <div>
          <span className="block">iPhone 12 Pro Max (Active)</span>
          <span className="text-sm text-gray-500">Last active: Sept 28, 2024</span>
        </div>
        <div>
          <span className="block">MacBook Pro (Active)</span>
          <span className="text-sm text-gray-500">Last active: Sept 25, 2024</span>
        </div>
      </div>
    </Accordion>
  );
};
