import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link'
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { UiContext } from '@/context';
import { ClearOutlined, SearchOutlined } from '@mui/icons-material';

export const Navbar = () => {
    const { asPath, push } = useRouter();
    const { toggleSideMenu } = useContext(UiContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        push(`/search/${ searchTerm }`);
    }
    
  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref legacyBehavior>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6'>Teslo | </Typography>
                    <Typography sx={{ ml: 0.5 }}>Shop </Typography>
                </Link>
            </NextLink>

            <Box sx={{ flex: 1 }}></Box>

            <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                className="fadeiIn"
            >
                <NextLink href='/category/men' passHref legacyBehavior>
                    <Link>
                        <Button color={ asPath === '/category/men' ? 'primary' : 'info' }>Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref legacyBehavior>
                    <Link>
                        <Button color={ asPath === '/category/women' ? 'primary' : 'info' }>Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kid' passHref legacyBehavior>
                    <Link>
                        <Button color={ asPath === '/category/kid' ? 'primary' : 'info' }>Niños</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box sx={{ flex: 1 }}></Box>

            {/* Pantallas grandes */}

            {
                isSearchVisible
                    ? (
                        <Input
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                            className='fadeIn'
                            autoFocus
                            value={ searchTerm }
                            onChange={ (e) => setSearchTerm( e.target.value )}
                            onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={ () => setIsSearchVisible(false) }
                                    >
                                        <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    ) : (
                        <IconButton
                            sx={{ display: {xs: 'none', sm: 'flex' }}}
                            onClick={ () => setIsSearchVisible(true) }
                            className='fadeIn'
                        >
                            <SearchOutlinedIcon />
                        </IconButton>
                    )
            }

            {/* Pantallas pequeñas */}
            <IconButton
                sx={{ display: {xs: 'flex', sm: 'none' }}}
                onClick={ toggleSideMenu }
            >
                <SearchOutlinedIcon />
            </IconButton>

            <NextLink href='/cart' passHref legacyBehavior>
                <Link>
                    <IconButton>
                        <Badge badgeContent= {2} color='secondary'>
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button onClick={ toggleSideMenu }>
                Menu
            </Button>

        </Toolbar>
    </AppBar>
  )
}
