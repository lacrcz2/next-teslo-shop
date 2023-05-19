import NextLink from 'next/link'
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export const Navbar = () => {
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

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <NextLink href='/category/men' passHref legacyBehavior>
                    <Link>
                        <Button>Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref legacyBehavior>
                    <Link>
                        <Button>Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kid' passHref legacyBehavior>
                    <Link>
                        <Button>Niños</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box sx={{ flex: 1 }}></Box>

            <IconButton>
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

            <Button>
                Menu
            </Button>

        </Toolbar>
    </AppBar>
  )
}
