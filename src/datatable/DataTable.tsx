import react from 'react';
import { getAPIs, IGetPapersResult, getImage } from '../api';
import { useQuery } from 'react-query';

function DataTable() {
    const { data, isLoading } = useQuery<IGetPapersResult>(['papers', 'popular'], getAPIs);
    console.log(data);
    return <div>hi</div>;
}

export default DataTable;
