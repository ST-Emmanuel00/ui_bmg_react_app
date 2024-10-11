import { Button, Dropdown, DropdownTrigger } from "@nextui-org/react";
import { Children } from "../../../types";
import { SlOptionsVertical } from "react-icons/sl";

interface ActionsProps extends Children {
}

export const DropdownActions: React.FC<ActionsProps> = ({ children }) => {
    return (
        <Dropdown className="min-w-3">
            <DropdownTrigger>
                <Button variant="bordered" className="border-none min-w-12">
                    <SlOptionsVertical className="mb-1 text-gray-500" />
                </Button>
            </DropdownTrigger>
            {children}
        </Dropdown>
    );
}