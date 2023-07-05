import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';
import { Link} from 'react-router-dom';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
export const AppTopbar = (props) => {
    const history = useHistory();
    const menu = useRef(null);
    const items = [
        
        {
            label: 'Welcome!',
        },
        {

        },
        {
            label: 'Mon Profile',
            icon: 'pi pi-fw pi-user',
            command: () => {
              // Navigate to the user profile page
              history.push('/user-info');
            },
        },
        {
            label: 'Paramétres',
            icon: 'pi pi-fw pi-cog',
        
        },
        {
            label: 'Activités',
            icon: 'pi pi-fw pi-calendar',

        },
        {
            separator: true
        },
        {
            label: 'Déconnexion',
            icon: 'pi pi-fw pi-power-off'
        }
    ];
    return (
        <>
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-dark.svg' : 'assets/layout/images/logo-white.svg'} alt="logo"/>
                <span>SAKAI </span>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

                <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
             
             
                <Button label="" icon="pi pi-user" onClick={(e) => menu.current.toggle(e)} />
                </ul>
             
        </div>
        
        </>
    );
}
