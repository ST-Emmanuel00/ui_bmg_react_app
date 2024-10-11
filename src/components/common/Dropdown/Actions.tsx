import { DropdownItem, DropdownMenu } from "@nextui-org/react";
import { Attributes } from "../../Table/TableActions";

interface ActionsProps {
    attributes: Attributes[];
}

export const Actions: React.FC<ActionsProps> = ({ attributes }) => {
    return (
        <DropdownMenu aria-label="Static Actions" className="w-full">
            {attributes.map(({ title, icon, onClick }, index) => (
                <DropdownItem
                    key={index}
                    onClick={onClick}
                    className="dark:text-white"
                    endContent={icon}
                >
                    <span>{title}</span>
                </DropdownItem>
            ))}
        </DropdownMenu>
    );
}