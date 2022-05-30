// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

//https://ecompliance.atlassian.net/browse/ALS-701
//ignore benign chrome issue with ResizeObserver
Cypress.on('uncaught:exception', (exception, test) => {
    console.error({ exception, test })
    /*We've chose to be non granular here for now as asssertions will still fail the test*/
    /*Sentry will pickup and throws in the app and the console in Cypress will highlight the throws in failed tests*/
    return false
})

Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
        const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`
        addContext({ test }, `../assets/screenshots/${Cypress.spec.name}/${screenshotFileName}`)
        addContext({ test }, `../assets/videos/${Cypress.spec.name}.mp4`)
    }
})

Cypress.on('window:before:load', (__e) => {
    // e is Window FYI
    const config = Cypress.config()
    window.cucumberJson.outputFolder = `${config.reporterOptions.reportDir}/cucumber-json`
})
