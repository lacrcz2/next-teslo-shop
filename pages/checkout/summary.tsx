import NextLink from 'next/link'
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';

import { ShopLayout } from "@/components/layouts";
import { CardList, OrderSummary } from "@/components/cart";

const SummaryPage = () => {
  return (
    <ShopLayout title={'Resumen de orden'} pageDescription={'Resumen de la orden'}>
        <Typography variant='h1' component='h1'>Resumen de orden</Typography>

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CardList />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen (3 productos)</Typography>
                        <Divider sx={{ my: 1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <NextLink href='/checkout/address' passHref legacyBehavior>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography>Fernando herrera</Typography>
                        <Typography>323 Algún lugar</Typography>
                        <Typography>Barquisimeto, Lara 3001</Typography>
                        <Typography>Venezuela</Typography>
                        <Typography>+58 4245898525</Typography>

                        <Divider sx={{ my: 1 }} />

                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref legacyBehavior>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <OrderSummary />

                        <Box sx={{ mt: 3 }}>
                            <Button color='secondary' className='circular-btn' fullWidth>
                                Confirmar Orden
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default SummaryPage;