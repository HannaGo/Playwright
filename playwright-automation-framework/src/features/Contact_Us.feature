Feature: webdriveruniversity.com - Contact Us page
    Scenario: Valid Contact Us From Submission
        Given I navigate to webdriveruniversity.com
        When I click on the Contact Us button
        And I switch to the new browser tab
        And I type a first name
        And I enter a valid last name
        And I enter a valid email address
        And I enter a valid message
        And I click on the Submit button
        Then I should see a success message for the form submission


    Scenario: Invalid Contact Us From Submission
        Given I navigate to webdriveruniversity.com
        When I click on the Contact Us button
        And I switch to the new browser tab
        And I type a first name
        And I enter a valid last name
        #And I enter a valid email address
        And I enter a valid message
        And I click on the Submit button
        Then I should be presented with an unsuccessful contact us message