import { Navigate, RouteDefinition, useRoutes } from "@solidjs/router";
import Applications from "../pages/Applications";
import CreateSchema from "../pages/CreateSchema";
import Credentials from "../pages/Credentials";
import CredentialTemplates from "../pages/CredentialTemplates";
import Overview from "../pages/Overview";
import DecentralizedIDs from "../pages/DecentralizedIDs";
import IssueCredential from "../pages/IssueCredential";
import PresentationDefinitions from "../pages/PresentationDefinitions";
import ResolveDID from "../pages/ResolveDID";
import Schemas from "../pages/Schemas";
import CreateCredentialTemplate from "../pages/CreateCredentialTemplate";
import Submissions from "../pages/Submissions";

export const routeConfig = [
    {
        path: '',
        component: () => {return Navigate({href: 'overview'})},
    },
    {
        path: 'overview',
        component: Overview,
        custom: {
            title: 'Overview'
        }
    },
    {
        path: 'decentralized-identities',
        custom: {
            title: 'Decentralized IDs'
        },
        children: [
            {
                path: '/',
                component: DecentralizedIDs,
                custom: {
                    title: 'Decentralized IDs'
                }
            },
            {
                path: '/resolve-did',
                component: ResolveDID,
                custom: {
                    title: 'Resolve a DID'
                }
            },
        ]
    },
    {
        path: 'credentials',
        custom: {
            title: 'Credentials'
        },
        children: [
            {
                path: '/',
                component: Credentials,
                custom: {
                    title: 'Credentials'
                },
            },
            {
                path: '/issue-credential',
                component: IssueCredential,
                custom: {
                    title: 'Issue a Credential'
                }
            },
        ]
    },
    {
        path: 'schemas',
        custom: {
            title: 'Schemas'
        },
        children: [
            {
                path: '/',
                component: Schemas,
                custom: {
                    title: 'Schemas'
                },
            },
            {
                path: '/create-schema',
                component: CreateSchema,
                custom: {
                    title: 'Create a Schema'
                }
            },
        ]
    },
    {
        path: 'credential-templates',
        custom: {
            title: 'Credential Templates'
        },
        children: [
            {
                path: '/',
                component: CredentialTemplates,
                custom: {
                    title: 'Credential Templates'
                },
            },
            {
                path: '/create-credential-template',
                component: CreateCredentialTemplate,
                custom: {
                    title: 'Create Template'
                }
            },
        ]
    },
    {
        path: 'presentation-definitions',
        component: PresentationDefinitions,
        custom: {
            title: 'Presentation Definitions'
        }
    },
    {
        path: 'applications',
        component: Applications,
        custom: {
            title: 'Applications'
        }
    },
    {
        path: 'submissions',
        component: Submissions,
        custom: {
            title: 'Submissions'
        }
    },
  ];

export const routes: RouteDefinition[] = routeConfig.map(({ custom, ...route }) => route);