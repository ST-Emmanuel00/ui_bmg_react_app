import { useState } from "react";
import { useAuth } from "./useAuth";

export const useExcel = (url: string) => {
    const [loading, setLoading] = useState(false);
    const { token } = useAuth()

    const downloadExcelFile = async () => {
        try {
            setLoading(true);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'disruptiveToken': token

                },

                credentials: 'include', // Esto asegurará que se envíen las cookies con la petición
            });



            if (!response.ok) {
                throw new Error(`Error al descargar el archivo: ${response.statusText} (status: ${response.status})`);
            }

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'datos.xlsx';
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(blobUrl);
            document.body.removeChild(link);

        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        } finally {
            setLoading(false);
        }
    }

    return { downloadExcelFile, loading };
}; 