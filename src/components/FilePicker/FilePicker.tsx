import { useState } from "react";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { 
    Button, 
    FileName, 
    FormContainer, 
    FormControl,
    RowDiv 
} from "./styles";

interface FilePickerProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FilePicker = (props: FilePickerProps) => {
    const { onSubmit } = props;
    const [selectedFiles, setSelectedFiles] = useState<string>('Ningún archivo seleccionado');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const names = Array.from(files).map(f => f.name).join(', ');
            setSelectedFiles(names);
        } else {
            setSelectedFiles('Ningún archivo seleccionado');
        }
    };
    
    const handleFakeClick = () => {
        const input = document.getElementById('file');
        if (input) input.click();
    };

    return (
        <FormContainer>
            <form onSubmit={onSubmit}>
            <FormControl>
                <label htmlFor="file">Adjuntar archivos PDF</label>

                <input
                    id="file"
                    name="files"
                    type="file"
                    required
                    multiple
                    accept=".pdf"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                
                <Button type="button" onClick={handleFakeClick}>
                    <RowDiv>
                        <FileUploadIcon style={{ marginRight: '8px', verticalAlign: 'middle', height: 25 }} />
                        <p style={{ margin: 2 }}>Seleccionar archivos</p>
                    </RowDiv>
                </Button>

                <FileName>
                    {selectedFiles}
                </FileName>
            </FormControl>
                <Button type="submit" fullwidth disabled={!selectedFiles || selectedFiles === 'Ningún archivo seleccionado'}>Enviar</Button>
            </form>
        </FormContainer>
    );
} 

export default FilePicker;
