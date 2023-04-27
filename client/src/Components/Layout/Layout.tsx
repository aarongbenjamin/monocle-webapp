import React, { FunctionComponent } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AppBar, Container } from '@mui/material'

const Layout: FunctionComponent = () => {
    return (
        <Container>
            <AppBar>
                <Link to="/">Claims</Link>
            </AppBar>
            
            <Outlet />
        </Container>
    )
}

export default Layout;