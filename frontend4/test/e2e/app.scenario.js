
/*globals angular, describe, browser, element, xdescribe, beforeEach, afterEach, it, xit, expect */

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Colleague-List', function () {
    "use strict";

    beforeEach(function () {
        browser().navigateTo('http://localhost:8000/app/index.html');
    });

    it('should show index.html as part of URL on startup', function () {
        expect(browser().location().url()).toBe("/index.html");
    });
});
