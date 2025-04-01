import { test, expect } from "@playwright/test";
import { BookStorePage } from "../pages/bookstore-page";
import { TestDataService } from "../pages/test-data-service/test-data-service";
import testData from "../test-data/test-2-search-funcionality.json";


interface SearchBookInput extends BaseInput {
  bookName: string;
}

interface SearchBookOutput extends BaseOutput {
  booksFound: boolean;
}

const testDataService = new TestDataService(testData);
const localTestData = testDataService.getTestData<SearchBookInput, SearchBookOutput>("TEST 2 - Search functionality");


test(localTestData.testName, async ({ page }) => {
  const bookStorePage = new BookStorePage(page);
  await bookStorePage.goto();

  await bookStorePage.bookStoreModal.searchBook(localTestData.input.bookName);
  await page.waitForTimeout(1000);

  const books = await bookStorePage.getBooksList();

  if (localTestData.expectedOutput.booksFound) {
    expect(books.length).toBeGreaterThan(0);
    for (const book of books) {
      expect(book.title.toLowerCase()).toContain(localTestData.input.bookName.toLowerCase());
    }
  } else {
    expect(books.length).toBe(0);
  };

});
