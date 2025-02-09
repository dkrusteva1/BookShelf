describe('books spec', () => {

    beforeEach(() => {
        localStorage.setItem('some@email.com', '\"123\"');
        localStorage.setItem('currentUser', '\"some@email.com\"');
        cy.visit('localhost:4200/books/home');
    });


    it('should display table with book information on books page', () => {
        cy.intercept('GET', 'https://anapioficeandfire.com/api/books', { fixture: 'books.json' }).as('booksListAPI');
        cy.intercept('GET', 'https://anapioficeandfire.com/api/books/1', { fixture: 'book.json' }).as('bookDetailAPI');

        // verify the list page
        cy.get('[data-test="bookshelf-title-message"]').should('be.visible');
        cy.get('[data-test="favourites-button"]').should('be.visible');
        cy.get('[data-test="logout-button"]').should('be.visible');
        cy.get('[data-test="table"]').find('tr').should('have.length', 11);

        // verify search
        cy.get('[data-test="input-search"]').clear().type('Game');
        cy.get('[data-test="search-button"]').click();
        cy.get('[data-test="table"]').find('tr').should('have.length', 2);

        // verify adding to favourites
        cy.get('[data-test="dislike-button"]').should('not.exist');
        cy.get('[data-test="like-button"]').should('be.visible').click();
        cy.get('[data-test="like-button"]').should('not.exist');

        // book details
        cy.get('[data-test="link-details"]').click();
        cy.url().should('include', '/books/1');

        // verify header buttons in details page
        cy.get('[data-test="favourites-details"]').should('be.visible');
        cy.get('[data-test="details-dislike-button"]').should('be.visible');
        cy.get('[data-test="details-like-button"]').should('not.exist');
        cy.get('[data-test="details-table"]').find('tr').should('have.length', 8);
        
        // verify dislike and like button from details page
        cy.get('[data-test="details-dislike-button"]').click();
        cy.get('[data-test="details-like-button"]').should('be.visible');
        cy.get('[data-test="details-dislike-button"]').should('not.exist');
        cy.get('[data-test="details-like-button"]').click();


        // verify favourites page
        cy.get('[data-test="favourites-details"]').click();
        cy.url().should('include', '/books/favourites');
        cy.get('[data-test="favourites-card"]').should('be.visible').contains('A Game of Thrones');
        cy.get('[data-test="favourites-book-released"]').should('be.visible').contains('Released: 01/08/1996');
        cy.get('[data-test="favourites-book-page"]').should('be.visible').contains(694);

        cy.get("[data-test='dislike']").click();
        cy.get("[data-test='no-books']").should('be.visible').contains(`Ooops! You don't have favourite books!`);

        //go to home page and verify that the button is like
        cy.get('[data-test="home-page"]').click();
        cy.url().should('include', '/books/home');
        cy.get('[data-test="input-search"]').clear().type('Game');
        cy.get('[data-test="search-button"]').click();
        cy.get('[data-test="like-button"]').should('be.visible');
        cy.get('[data-test="link-details"]').click();
        cy.url().should('include', '/books/1');
        
        // check if the details for the first book contain like and not dislike button
        cy.get('[data-test="details-dislike-button"]').should('not.exist');
        cy.get('[data-test="details-like-button"]').should('be.visible');
    });
});