import { LinkButton } from '../common/LinksMenu/LinkButton';
import { useExcel } from '../../Hooks/useExcel';
import { RiFileExcel2Line } from 'react-icons/ri';




const LinkButtonExcel = () => {


    
    const URL = window.location.href;
    let endpoint = '';
    let totalSlash = 0;
    
    for (const char of URL) {
        if (char === '/') {
            totalSlash += 1;
        } else if (totalSlash >= 4) {
            endpoint += char;
        }
    }



    const { downloadExcelFile } = useExcel(`http://localhost:8000/api/${endpoint}/file/excel`)

    return (
        <LinkButton label={'Excel'} onClick={downloadExcelFile} icon={RiFileExcel2Line} />
    );
};

export default LinkButtonExcel;
