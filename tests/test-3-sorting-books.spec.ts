import { test, expect } from '@playwright/test';
import { BookStorePage } from '../pages/bookstore-page';
import { PlaywrightBlocker } from '@cliqz/adblocker-playwright';
import fetch from 'cross-fetch';
import { TestDataService } from "../pages/test-data-service/test-data-service";
import testData from "../test-data/test-3-sorting-books.json";

interface SortBooksInput {
  sortOrder: string;
  expectedOrder: string;
}

interface SortBooksOutput {
  isSorted: boolean;
}

const testDataService = new TestDataService(testData);
const ascendingSortTestData = testDataService.getTestData<SortBooksInput, SortBooksOutput>("TEST 1 - Sort books by price (ascending)");
const descendingSortTestData = testDataService.getTestData<SortBooksInput, SortBooksOutput>("TEST 2 - Sort books by price (descending)");

test.describe('Sorting books by price', () => {
  let bookStorePage: BookStorePage;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Enable AdBlocker
    const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
    await blocker.enableBlockingInPage(page);
    
    bookStorePage = new BookStorePage(page);
    await bookStorePage.goto();
  });

  // Test 1: Sort books by price (ascending)
  test(ascendingSortTestData.testName, async () => {
    await bookStorePage.bookStoreModal.sortByPrice(ascendingSortTestData.input.sortOrder);
    const isSorted = await bookStorePage.bookStoreModal.checkPricesSorted(ascendingSortTestData.input.expectedOrder as "ASC" | "DESC");
    
    expect(isSorted).toBe(ascendingSortTestData.expectedOutput.isSorted);
  });

  // Test 2: Sort books by price (descending)
  test(descendingSortTestData.testName, async () => {
    await bookStorePage.bookStoreModal.sortByPrice(descendingSortTestData.input.sortOrder);
    const isSorted = await bookStorePage.bookStoreModal.checkPricesSorted(descendingSortTestData.input.expectedOrder as "ASC" | "DESC");
    
    expect(isSorted).toBe(descendingSortTestData.expectedOutput.isSorted);
  });
});