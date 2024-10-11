import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { useAxios } from '../../Hooks';
import { AlertHandler } from '../common/AlertHandler';


const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&::before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&::after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

interface DataProps {
    userId: string;
    userStatus: boolean;
}

interface data {
    userData: DataProps
}

export const CustomizedStatus: React.FC<data> = ({ userData }) => {


    const { userId, userStatus } = userData

    let { hasError, response, put, isLoading } = useAxios()
    const [check, setCheck] = useState<boolean>(userStatus);





    const changeStatus = () => {
        isLoading = true
        setCheck(!check)
        put(`users/status/${userId}`, {
            status: check
        })
    };


    return (
        <>
            <AlertHandler hasError={hasError} response={response} redirec />
            {isLoading ? (
                // <span className="loading loading-dots loading-lg"></span>
                <span className="loading loading-dots loading-md ml-3"></span>

            ) : (
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Android12Switch
                                sx={{ m: 1 }}
                                checked={check}
                                onClick={changeStatus}
                            />
                        }
                        label={undefined}
                    />
                </FormGroup>
            )}
        </>
    );
};