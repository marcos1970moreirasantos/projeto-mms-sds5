import axios from "axios";
import Pagination from "componentes/Pagination";
import { useEffect } from "react";
import { useState } from "react";
import { SalePage } from "type/sale";
import { formatLocalDate } from "utils/formats";
import { BASE_URL } from "utils/request";

const DataTable = () => {
    const [activePage, setActivePage] = useState(0);

    const [page, setPage] = useState<SalePage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0

    });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales?page=${activePage}&<size-20&sort-date,desc`)
            .then(response => {
                setPage(response.data);
            });
    }, [activePage]);
    const changePage = (index: number) => {
        setActivePage(index);
    }

    return (
        <>
            <Pagination page={page} onPageChange={changePage} />
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Vendedor</th>
                            <th>Clientes visitados</th>
                            <th>Negócios fechados</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {page.content?.map((_item: any) => (
                            <tr key={_item.id}>

                                <td>{formatLocalDate(_item.date, "dd/MM/yyyy")}</td>
                                <td>{_item.seller.name}</td>
                                <td>{_item.visited}</td>
                                <td>{_item.deals}</td>
                                <td>{_item.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >

        </>
    );
}

export default DataTable;