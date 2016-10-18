Feature: Departures feature

  Scenario: As a user I can see the departures view
    Then I am at 60.172332, 24.941293
    Then I wait to see "On the stop"
    Then I touch the "On the bus" text
    Then I wait to see "Departures from Elielinaukio"
