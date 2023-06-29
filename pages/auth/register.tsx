import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next';

import NextLink from 'next/link'
import { signIn, getSession } from 'next-auth/react';

import { useForm } from 'react-hook-form'
import { AuthLayout } from "@/components/layouts"
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material"
import { ErrorOutline } from '@mui/icons-material'

import { tesloApi } from '@/api'
import { validations } from '@/utils'
import { AuthContext } from '../../context';

type FormData = {
    name: string;
    email: string;
    password: string;
}

const registerPage = () => {
    const router = useRouter();
    const { registerUser } = useContext(AuthContext);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onRegisterForm = async( { email, password, name }: FormData ) => {
        setShowError(false);
        const { hasError, message } = await registerUser(name, email, password);

        if ( hasError ) {
            setShowError(true);
            setErrorMessage( message! );
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        // const destination = router.query.p?.toString() || '/';
        // router.replace(destination);

        await signIn('credentials',{ email, password });
    }
  return (
    <AuthLayout title={"Ingresar"}>
        <form onSubmit={ handleSubmit( onRegisterForm ) } noValidate>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                        <Chip
                            label='Error al reguistrar ese usuario/ contraseña'
                            color='error'
                            icon={ <ErrorOutline /> }
                            sx={{ display: showError ? 'flex' : 'none' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            type='text' label='Nombre' variant='filled' fullWidth
                            { ...register('name', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.name }
                            helperText={ errors.name?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type='email' label='Correo' variant='filled' fullWidth
                            { ...register('email', {
                                required: 'Este campo es requerido',
                                validate: validations.isEmail
                            })}
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type='password' label='Contrasena' variant='filled' fullWidth
                            { ...register('password', {
                                required: 'Este campo es requerido',
                                minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                            })}
                            error={ !!errors.password }
                            helperText={ errors.password?.message }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" color='secondary' className='circular-btn' size='large' fullWidth>
                            Ingresar
                        </Button>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href='/auth/login' passHref legacyBehavior>
                            <Link underline='always'>
                                ¿Ya tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req });
    const { p = '/' } = query;

    if ( session ) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: { }
    }
}

export default registerPage;