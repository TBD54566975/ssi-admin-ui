import { Navigate, RouteDefinition, useIsRouting } from "@solidjs/router";
import Applications from "../pages/Applications";
import CreateSchema from "../pages/CreateSchema";
import Credentials from "../pages/Credentials";
import Overview from "../pages/Overview";
import DecentralizedIDs from "../pages/DecentralizedIDs";
import IssueCredential from "../pages/IssueCredential";
import PresentationDefinitions from "../pages/PresentationDefinitions";
import ResolveDID from "../experimental/ResolveDID";
import CreateCredentialTemplate from "../pages/CreateCredentialTemplate";
import Modal from "../components/Modal";
import CreateDID from "../components/CreateDID";
import SetDID from "../experimental/SetDID";


export const routesWithCustomData = [
    {
        path: '/',
        component: () => { return Navigate({ href: '/overview'}) },
    },
    {
        path: 'overview',
        component: Overview,
        custom: {
            title: 'Overview'
        }
    },
    {
        path: 'credentials',
        component: CreateCredentialTemplate,
        custom: {
            title: 'Credentials'
        },
    },
    {
        path: 'issuing',
        custom: {
            title: 'Issuing'
        },
        children: [
            {
                path: '/',
                component: IssueCredential,
                custom: {
                    title: 'Issue'
                },
            },
            {
                path: 'automate',
                component: Credentials,
                custom: {
                    title: 'Automate'
                }
            },
            {
                path: 'view-all',
                component: Credentials,
                custom: {
                    title: 'All'
                }
            },
        ]
    },
    {
        path: 'verification',
        custom: {
            title: 'Verification'
        },
        children: [
            {
                path: '/',
                component: PresentationDefinitions,
                custom: {
                    title: 'Request'
                },
            },
            {
                path: 'verify',
                component: Credentials,
                custom: {
                    title: 'Verify'
                }
            },
            {
                path: 'view-all',
                component: Credentials,
                custom: {
                    title: 'All'
                }
            },
        ]
    },
    {
        path: 'd-id',
        custom: {
            title: 'D-IDs'
        },
        children: [
            {
                path: '/',
                component: DecentralizedIDs,
                custom: {
                    title: 'Manage'
                }
            },
            {
                path: '/resolve',
                component: ResolveDID,
                custom: {
                    title: 'Resolve'
                }
            },
        ]
    },
]

export const routesForSidebar: { [k: string]: any } = routesWithCustomData.reduce((array, value) => ({ ...array, [value['path']]: value}), {});

export const routesForNavbar = routesWithCustomData?.filter(route => route.custom);

function removeCustomData(routes: typeof routesWithCustomData): any {
    return routes.map((route: typeof routesWithCustomData[1]) => {
      const { custom, children, ...rest } = route;
      return {
        ...rest,
        ...children && { children: removeCustomData(children) }
      }
    });
}

export const routeConfig: RouteDefinition[] = [
    {
        path: '',
        children: removeCustomData(routesWithCustomData)
    },
    {
        path: '/set-did',
        component: Modal,
    },
    {
        path: '/set-did-did',
        component: SetDID,
    },
    {
        path: ':id/create-did',
        component: CreateDID,
    },
    {
        path: '/resolve-did',
        component: Modal,
    },
    {
        path: '/create-schema',
        component: Modal,
    },
    {
        path: "*",
        component: () => { return Navigate({ href: '/'}) }
    }
  ];