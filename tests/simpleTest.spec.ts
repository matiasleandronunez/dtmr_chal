import {expect, test} from "@playwright/test"


test.describe('DTMR practical exercise', () => {
    test('should navigate to Page two and see the same values in dropdown', async ({ page }) => {
        // Precondition as depicted in exercise
        console.log('Precondition: Navigating to Page1');
        
        await page.goto(`${process.env.BASE_URL ?? 'http://localhost:8080'}/page1.html`);

        console.log("Starting test ---> \n");

        // First I get all value pairs displayed in the table in page1
        const issueBucketValues : {[key: number]: string} = {};

        for (let tr of await page.locator("//table[@id='issue-bucket-mapping']//tr[td[@class='issue-col']]").all()){
            let issue = await tr.locator('//td[@class="issue-col"]').first().textContent() ?? '';
            let bucket = await tr.locator('//td[@class="bucket-col"]').first().textContent() ?? '';

            issueBucketValues[parseInt(issue.replace(/[^\d]/g, ''))] = bucket.trim();
        }

        console.log(`Page1 table values retrieved:\n${JSON.stringify(issueBucketValues, null, 2)}`);
        
        // Navigate to page2
        console.log('Navigating to page two');
        
        await page.locator("a[href*='page2']").click();


        // Get all values from dropdown and parse
        const allDropdownItems = await (await page.locator("div.dropdown-item")).all();

        
        // Make a quick check on number of items, no need to waste time iterating if item quantity doesn't match
        const page1count = Object.entries(issueBucketValues).length;
        
        await expect(allDropdownItems, `Dropdown item quantity doesnt match expectations. Got ${page1count} in page1 and found ${allDropdownItems.length} in page2's dropdown`).toHaveLength(page1count);

        
        // iterate all values and check against those in page1
        for (let divItem of allDropdownItems){
            let issueComboValue = await divItem.locator('span:nth-child(1)').first().textContent() ?? '';
            let bucketComboValue = await await divItem.locator('span:nth-child(2)').first().textContent() ?? '';

            let key = parseInt(issueComboValue.replace(/[^\d]/g, ''));

            await expect(issueBucketValues[key],`Bucket for Issue${key} doesn't match value in page1. Expected: ${issueBucketValues[key]}, got: ${bucketComboValue.trim()}`).toEqual(bucketComboValue.trim());
        }
    });
});
