import NextLink from 'next/link'
import { Chip, Grid, Link, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridValueGetterParams } from "@mui/x-data-grid"

import { ShopLayout } from "@/components/layouts"

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 100 },
    {field: 'fullName', headerName: 'Nombre Completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra información si está pagada la ordeno no',
        width: 200,
        renderCell: ( params: GridRenderCellParams ) => {
            return params.row.paid
                ? <Chip color='success' label='Pagada' variant='outlined' />
                : <Chip color='error' label='No Pagada' variant='outlined' />
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: ( params: GridRenderCellParams ) => {
            return (
                <NextLink href={`/orders/${ params.row.id }}]`} passHref legacyBehavior>
                    <Link underline='always'>
                        Ver Orden
                    </Link>
                </NextLink>
            )
        }
    },
]

const rows = [
    { id: 1, paid: true, fullName: 'Fernando Herrera' },
    { id: 2, paid: false, fullName: 'Melissa Flores' },
    { id: 3, paid: true, fullName: 'Hernando Vallejo' },
    { id: 4, paid: false, fullName: 'Emin Reyes' },
    { id: 5, paid: false, fullName: 'Eduardo Rios' },
    { id: 6, paid: true, fullName: 'Natalia Herrera' }
]

const HistoryPage = () => {
  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

        <Grid container>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid
                    rows={ rows }
                    columns={ columns }
                    initialState={{
                        pagination: { 
                          paginationModel: { pageSize: 5 } 
                        },
                      }}
                    pageSizeOptions={[5, 10, 25]}
                    autoHeight
                />
            </Grid>

        </Grid>
    </ShopLayout>
  )
}

export default HistoryPage