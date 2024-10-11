import { Td } from './Td'
import { CustomizedStatus } from './statusSwitch'

interface TableSwitch {

    id: string,
    status: boolean
}
export const TableSwitch: React.FC<TableSwitch> = ({ id, status }) => {
    return (
        <Td type='secundary'>
            <CustomizedStatus userData={{ userId: id, userStatus: status }} ></CustomizedStatus>
        </Td>)
}
