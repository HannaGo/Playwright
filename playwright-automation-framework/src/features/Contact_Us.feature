Feature: webdriveruniversity.com - Contact Us page

    Background: Preconditions
        Given I navigate to webdriveruniversity.com
        When I click on the Contact Us button
        And I switch to the new browser tab

    Scenario: Valid Contact Us From Submission
        And I type a first name
        And I enter a valid last name
        And I enter a valid email address
        And I enter a valid message
        And I click on the Submit button
        Then I should see a success message for the form submission


    Scenario: Invalid Contact Us From Submission
        And I type a first name
        And I enter a valid last name
        #And I enter a valid email address
        And I enter a valid message
        And I click on the Submit button
        Then I should be presented with an unsuccessful contact us message

    Scenario: Valid Contact Us From Submission - Using Specific Data
        And I type a specific first name "Sarah"
        And I enter a specific last name  "Woods"
        And I enter a specific email address "sarah.woods@example.com"
        And I enter a specific message "Hello World" and a number 2 within the comment input field
        And I click on the Submit button
        Then I should see a success message for the form submission

    Scenario: Valid Contact Us From Submission - Using random data
        And I type a random first name
        And I enter a random last name
        And I enter a random email address
        And I enter a valid message
        And I click on the Submit button
        Then I should see a success message for the form submission


    Scenario Outline: SValidate Contact Us Page
        And I type a first name <firstName> and a last name <lastName>
        And I enter an email address '<emailAddress>' a comment '<comment>'
        And I click on the Submit button
        Then I should be presented with header text '<message>'

        Examples:
            | firstName | lastName | emailAddress          | comment     | message                     |
            | John      | Doe      | john.doe@example.com  | Hello World | Thank You for your Message! |
            | Mia       | Smith    | mia.smith@example.com | Hi there!   | Thank You for your Message! |
            | Grace     | Hudson   | grace.hudson          | Hi there!   | Invalid email address      |


