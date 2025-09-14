Feature: WebdriverUniversity.com - Login Page

    Scenario Outline: Validate valid & invalid login
        Given I navigate to webdriveruniversity.com
        When I click on the Login Portal button
        And I switch to the new browser tab
        And I type a username <username>
        And I type a password <password>
        And I click on the login button
        Then I should see an alert with a text '<expectedAlertText>'

        Examples:
            | username  | password     | expectedAlertText    |
            | webdriver | webdriver123 | validation succeeded |
            | webdriver | Password123  | validation failed    |


