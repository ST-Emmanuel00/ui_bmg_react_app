import { FaArrowTurnDown, FaArrowTurnUp } from "react-icons/fa6";
import { DropdownActions } from "../common/Dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../Store/TableStore";
import { sortedColumns } from "../../features/Table/ColumOrderSlice";
import { Actions } from "../common/Dropdown/Actions";


export const HeaderTitles: React.FC = ({ }) => {
    const dispatch = useDispatch()
    const headerTitlesDispatch = useSelector((state: RootState) => state.headerTitles)



    return (
        headerTitlesDispatch.map(({ label, value }, index) => (
            <th key={index} className={`relative py-3 px-4 font-medium text-black dark:text-white ${index === 0 ? "xl:pl-11" : ""}`}>
                <div className="flex items-center">
                    {label}
                    {!label.includes('Status') && !label.includes('Actions') && !label.includes('Permissions') && (
                        <button className="ml-2 mt-1">
                            <DropdownActions>
                                <Actions attributes={[
                                    {
                                        title: 'Ascending',
                                        icon: <FaArrowTurnUp />,
                                        onClick: () => {
                                            // dispatch(sortedColumns(setSort({ atributte: value, order: 'asc' }));)) 
                                            dispatch(sortedColumns({ attribute: value, order: 'asc' }))

                                        }
                                    },
                                    {
                                        title: 'Descending',
                                        icon: <FaArrowTurnDown />,
                                        onClick: () => {
                                            dispatch(sortedColumns({ attribute: value, order: 'desc' }))

                                        }
                                    }
                                ]} />
                            </DropdownActions>
                        </button>
                    )}
                </div>
            </th>
        ))
    )
}