import {test} from '@playwright/test'; 
import {HomePage} from '../pages/home.page'; 

test.describe('Home', () => {
    test('Carregamento correto', async ({page}) => {
        const homePage = new HomePage(page);

        await homePage.navigate('/');
        await homePage.validateHomePage();
    })
})