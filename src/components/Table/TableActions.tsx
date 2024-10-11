import { MouseEventHandler, ReactNode } from 'react';
import { Actions } from '../common/Dropdown/Actions';
import { DropdownActions } from "../common/Dropdown/Dropdown"
import { Td } from "./Td"

export interface Attributes {
    title: string;
    icon?: ReactNode;
    onClick: MouseEventHandler<HTMLLIElement>;
}

interface ActionsProps {
    array: Attributes[]
}

export const TableActions: React.FC<ActionsProps> = ({ array }) => {
    return (
        <Td type="secundary">
            <DropdownActions>
                <Actions attributes={array} />
            </DropdownActions>
        </Td>)
}
