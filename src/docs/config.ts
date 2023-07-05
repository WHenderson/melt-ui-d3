import type { NavItem, SidebarNavItem } from '$docs/types';

export const siteConfig = {
	name: 'Melt UI',
	url: 'https://melt-ui.com',
	ogImage: 'https://melt-ui.com/og.jpg',
	description:
		'An open-source collection of accessible & customizable component builders for creating user interfaces with Svelte.',
	links: {
		github: 'https://github.com/melt-ui/melt-ui',
		discord: 'https://discord.gg/cee8gHrznd',
	},
	keywords: 'meltui,svelte,sveltekit,sveltekit components,svelte headless, radix svelte',
};

type NavConfig = {
	mainNav: NavItem[];
	sidebarNav: SidebarNavItem[];
};

export const navConfig: NavConfig = {
	mainNav: [
		{
			title: 'Docs',
			href: '/docs',
		},
		{
			title: 'Builders',
			href: '/docs/builders',
		},
	],
	sidebarNav: [
		{
			title: 'Overview',
			items: [
				{
					title: 'Introduction',
					href: '/docs/introduction',
					items: [],
				},
				{
					title: 'Getting Started',
					href: '/docs/getting-started',
					items: [],
				},
			],
		},
		{
			title: 'Builders',
			items: [
				{
					title: 'Accordion',
					href: '/docs/builders/accordion',
					items: [],
				},
				{
					title: 'Avatar',
					href: '/docs/builders/avatar',
					items: [],
				},
				{
					title: 'Checkbox',
					href: '/docs/builders/checkbox',
					items: [],
				},
				{
					title: 'Collapsible',
					href: '/docs/builders/collapsible',
					items: [],
				},
				{
					title: 'Context Menu',
					href: '/docs/builders/context-menu',
					items: [],
				},
				{
					title: 'Dialog',
					href: '/docs/builders/dialog',
					items: [],
				},
				{
					title: 'Dropdown Menu',
					href: '/docs/builders/dropdown-menu',
					items: [],
				},
				{
					title: 'Hover Card',
					href: '/docs/builders/hover-card',
					items: [],
				},
				{
					title: 'Label',
					href: '/docs/builders/label',
					items: [],
				},
				{
					title: 'Menubar',
					href: '/docs/builders/menubar',
					items: [],
				},
				{
					title: 'Pagination',
					href: '/docs/builders/pagination',
					items: [],
				},
				{
					title: 'Popover',
					href: '/docs/builders/popover',
					items: [],
				},
				{
					title: 'Progress',
					href: '/docs/builders/progress',
					items: [],
				},
				{
					title: 'Radio Group',
					href: '/docs/builders/radio-group',
					items: [],
				},
				{
					title: 'Select',
					href: '/docs/builders/select',
					items: [],
				},
				{
					title: 'Separator',
					href: '/docs/builders/separator',
					items: [],
				},
				{
					title: 'Slider',
					href: '/docs/builders/slider',
					items: [],
				},
				{
					title: 'Switch',
					href: '/docs/builders/switch',
					items: [],
				},
				{
					title: 'Tabs',
					href: '/docs/builders/tabs',
					items: [],
				},
				{
					title: 'Tags Input',
					href: '/docs/builders/tags-input',
					items: [],
				},
				{
					title: 'Toggle',
					href: '/docs/builders/toggle',
					items: [],
				},
				{
					title: 'Toggle Group',
					href: '/docs/builders/toggle-group',
					items: [],
				},
				{
					title: 'Toolbar',
					href: '/docs/builders/toolbar',
					items: [],
				},
				{
					title: 'Tooltip',
					href: '/docs/builders/tooltip',
					items: [],
				},
			],
		},
	],
};
