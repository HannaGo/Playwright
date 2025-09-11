import {BrowserContext, Page} from '@playwright/test';

export const pageFixture = {
    //@ts-ignore
    page: undefined as Page,

    context: undefined as BrowserContext,
};