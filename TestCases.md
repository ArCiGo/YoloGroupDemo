# Test Cases

Some functional and non-functional test cases for Yolo Group assessment.

## Assumptions 🤔

* API testing should be performed (functional and non-functional).
* As the assessment says, this project uses a mock server. Once the Development team develops the ExBanking services, and is ready to use, the tests will be updated with the right URL and endpoints. If needed the requests and responses might be updated.

## Endpoint's formats

<table>
    <thead>
        <tr>
            <th style="text-align:center">Operation</th>
            <th style="text-align:center">Endpoint</th>
            <th style="text-align:center">HTTP verb</th>
            <th style="text-align:center">Body request</th>
            <th style="text-align:center">Body response</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align:center"><b>create_user</b></td>
            <td style="text-align:center"><i>{{url}}/users</i></td>
            <td style="text-align:center"><b>POST</b></td>
            <td>
                <pre>
                    {
                        "name": "Matelda",
                        "firstLastName": "Ivimey",
                        "secondLastName": "Yousef",
                        "CURP": "COEA791226MGRRVM07",
                        "RFC": "COEA791226D68"
                    }
                </pre>
            </td>
            <td>
                <pre>
                    {
                        "id": "9b157424-90c0-462e-ae57-86e895248ed1",
                        "status": "Successful",
                        "name": "Matelda",
                        "firstLastName": "Ivimey",
                        "secondLastName": "Yousef",
                        "CURP": "COEA791226MGRRVM07",
                        "RFC": "COEA791226D68",
                        "account": "374283589513936",
                        "dateTime": "6/18/2022T17:35"
                    }
                </pre>
            </td>
        </tr>
        <tr>
            <td style="text-align:center"><b>deposit</b></td>
            <td style="text-align:center"><i>{{url}}/deposits</i></td>
            <td style="text-align:center"><b>POST</b></td>
            <td>
                <pre>
                    {
                        "account": "6391083442041505",
                        "ammount": 560.00
                    }
                </pre>
            </td>
            <td>
                <pre>
                    {
                        "status": "Successful",
                        "account": "6391083442041505",
                        "ammount": 560.00,
                        "dateTime": "6/18/2022T17:35
                    }
                </pre>
            </td>
        </tr>
        <tr>
            <td style="text-align:center"><b>withdraw</b></td>
            <td style="text-align:center"><i>{{url}}/withdrawals</i></td>
            <td style="text-align:center"><b>POST</b></td>
            <td>
                <pre>
                    {
                        "account": "6391083442041505",
                        "ammount": 30.45
                    }
                </pre>
            </td>
            <td>
                <pre>
                    {
                        "status": "Successful",
                        "account": "6391083442041505",
                        "withdraw": 30.45,
                        "newBalance": 529.55,
                        "dateTime": "6/18/2022T17:35
                    }
                </pre>
            </td>
        </tr>
        <tr>
            <td style="text-align:center"><b>get_balance</b></td>
            <td style="text-align:center"><i>{{url}}/balance/{{account}}</i></td>
            <td style="text-align:center"><b>GET</b></td>
            <td></td>
            <td>
                <pre>
                    {
                        "account": "6391083442041505",
                        "balance": 529.55
                    }
                </pre>
            </td>
        </tr>
        <tr>
            <td style="text-align:center"><b>send</b></td>
            <td style="text-align:center"><i>{{url}}/transfers</i></td>
            <td style="text-align:center"><b>POST</b></td>
            <td>
                <pre>
                    {
                        "account": "6391083442041505",
                        "ammount": 45.00,
                        "destination": "5434804060114097",
                        "concept": "Doing an amazing transfer!
                    }
                </pre>
            </td>
            <td>
                <pre>
                    {
                        "status": "Successful",
                        "account": "6391083442041505",
                        "ammount": 45.00,
                        "destination": "5434804060114097",
                        "concept": "Doing an amazing transfer!",
                        "newBalance": 484.55,
                        "dateTime": "6/18/2022T17:35"
                        }
                </pre>
            </td>
        </tr>
    </tbody>
</table>

## Test scenarios 💻

**Functional testing**

```gherkin
Feature: ExBanking API demo flow

# TC1. As a tester I should be able to create a user
Scenario outline: Create a user
    Given the following body request values "<name>", "<firstLastName>", "<secondLastName>", "<CURP>", "<RFC>" for the {{url}}/users endpoint (POST)
    When I send it
    Then I should get a successful body response with status code 200

    Examples:
    | name      | firstLastName | secondLastName    | CURP                  | RFC               |
    | "Matelda" | "Ivimey"      | "Yousef"          | "COEA791226MGRRVM07"  | "COEA791226D68"   |

# TC2. As a tester I should not be able to create a user that already exists
Scenario outline: Attempt to create a user that already exists
    Given the following body request values "<name>", "<firstLastName>", "<secondLastName>", "<CURP>", "<RFC>" for the {{url}}/users endpoint (POST)
    When I send it
    Then I should get a message telling me that the user already exists
    And the status code should be 409

    Examples:
    | name      | firstLastName | secondLastName    | CURP                  | RFC               |
    | "Matelda" | "Ivimey"      | "Yousef"          | "COEA791226MGRRVM07"  | "COEA791226D68"   |

# TC3. As a tester I should be able to get all the users
Scenario: Get all the users registered in ExBanking
    Given the following {{url}}/users endpoint (GET)
    When I send it
    Then I should get all the users registered in ExBanking
    And the status code should be 200

# TC4. As a tester I should be able to get a specific user
Scenario outline: Get an existing user by CURP
    Given the following "<CURP>" param for the {{url}}/users/{{CURP}} endpoint (GET)
    When I send it
    Then I should get that user
    And the status code should be 200

    Examples:
    | CURP                  |
    | COEA791226MGRRVM07    |

# TC5. The service should return a message if the user does not exist
Scenario outline: Service should return a message if the user does not exist
    Given the following "<CURP>" param for the {{url}}/users/{{CURP}} endpoint (GET)
    When I send it
    Then the service should return a message telling me that the user does not exist
    And the status code should be 404

    Examples:
    | CURP                  |
    | MUAE770826HHGNGD54    |

# TC6. As a tester I should be able to perform a deposit to an existing account
Scenario outline: Deposit money to an existing account
    Given the following body request values "<account>" and "<ammount>" for the {{url}}/deposits endpoint (POST)
    When I send it
    Then I should get a successful body response with status code 200

    Examples:
    | account           | ammount   |
    | 6391083442041505  | 560.00    |

# TC7. As a tester I should not be able to perform a deposit if the account does not exist
Scenario outline: Attempt to deposit money to a non-existing account
    Given the following body request values "<account>" and "<ammount>" for the {{url}}/deposits endpoint (POST)
    When I send it
    Then the service should return a message telling me that the operation was not performed due to the account does not exist
    And the status code should be 404

    Examples:
    | account           | ammount   |
    | 7391063999991501  | 560.00    |

# TC8. As a tester I should be able to withdraw money from any account
Scenario outline: Withdraw money
    Given the following body request values "<account>" and "<ammount>" for the {{url}}/withdrawals endpoint (POST)
    When I send it
    Then I should get a successful body response 
    And the status code should be 200

    Examples:
    | account           | ammount   |
    | 6391083442041505  | 30.45     |

# TC9. As a tester I should not be able to withdraw money if the account does not have funds
Scenario outline: Attempt to withdraw money from an account without funds
    Given the following body request values "<account>" and "<ammount>", where the account does not have funds, for the {{url}}/withdrawals endpoint (POST)
    When I send it
    Then the service should return a message telling me that the operation was not performed due to the account does not have funds
    And the status code should be 400

    Examples:
    | account           | ammount   |
    | 5555583442033509  | 30.45     |

# TC10. As a tester I should be able to get a balance from a specific account
Scenario outline: Get balance from a specific account
    Given the following "<account>" param for the {{url}}/balance/{{account}} endpoint (GET)
    When I send it
    Then I should be able to get the balance
    And the status code should be 200

    Examples:
    | account           |
    | 6391083442041505  |

# TC11. As a tester I should not be able to get a balance if the account does not exist
Scenario outline: Attempt to get balance from a non-existing account
    Given the following "<account>" param for the {{url}}/balance/{{account}} endpoint (GET)
    When I send it
    Then the service should return a message telling me that account does not exist
    And the status code should be 404

    Examples:
    | account           |
    | 7323083332555501  |

# TC12. As a tester I should be able to send money to an existing account
Scenario outline: Send money to an existing account
    Given the following body requests values "<account>", "<ammount>", "<destination>" and "<concept>" for the {{url}}/transfers endpoint (POST)
    When I send it
    Then I should get a successful body response
    And the status code should be 200

    Examples:
    | account           | ammount   | destination       | concept                       |
    | 6391083442041505  | 45.00     | 5434804060114097  | "Doing an amazing transfer!"  |

# TC13. As a tester I should not be able to send money if the account does not exist
Scenario outline: Attempt to send money to an non-existing account
    Given the following body requests values "<account>", "<ammount>", "<destination>" and "<concept>", where the account does not exist, for the {{url}}/transfers endpoint (POST)
    When I send it
    Then the service should return a message telling me that account does not exist
    And the status code should be 404

    Examples:
    | account           | ammount   | destination       | concept                       |
    | 6391083442041505  | 45.00     | 5434804060114097  | "Doing an amazing transfer!"  |

# TC14. As a tester I should not be able to send money if the ammount is less than or equal to $0.00
Scenario outline: Attempt to send $0.00
    Given the following body requests values "<account>", "<ammount>", "<destination>" and "<concept>", for the {{url}}/transfers endpoint (POST)
    When I send it
    Then the service should return a message telling me that the ammount should be greater than $0.00
    And the status code should be 400

    Examples:
    | account           | ammount   | destination       | concept                       |
    | 6391083442041505  | 0.00      | 5434804060114097  | "Doing an amazing transfer!"  |

# TC14. As a tester I should not be able to send money if I do not have funds in the account
Scenario outline: Attempt to send money using an account without funds
    Given the following body requests values "<account>", "<ammount>", "<destination>" and "<concept>", for the {{url}}/transfers endpoint (POST)
    When I send it
    Then the service should return a message telling me that the account does not have funds
    And the status code should be 400

    Examples:
    | account           | ammount   | destination       | concept                       |
    | 5434804060114097  | 9000.00   | 374283589513936   | "Doing an amazing transfer!"  |
```

For demo purposes, the following functional test cases are going to be automated: **TC1, TC2, TC3, TC4, TC6, TC8, TC10, TC12**.

**Non-Functional testing**

```gherking
#TC15. The service must support a number n of users in a specific time n
Scenario outline: Get all users endpoint should support n users in n seconds.
    Given the folowing endpoint {{url}}/users (GET), with "<users>" sent simultaneously in "<seconds>" seconds
    When I send it
    Then the application load time should not exceed 10 seconds

    Examples:
    | users     | seconds   |
    | 10        | 10        |
    | 100       | 100       |
    | 1000      | 150       |
    | 10000     | 200       |
    | 100000    | 300       |

#TC16. The service should be installable in any cloud service
Scenario: Install the ExBanking Service on AWS
    Given the ExBanking installation package
    When I install it on AWS
    Then it should be installed properly, without problems, and should work.

#TC17. The service messages should be translated into any language
Scenario outline: Change the language of the service
    Given the ExBanking service is used in "<language>"
    Then I should be able to see all the messages translated in the language I set

    Examples:
    | language      |
    | español       |
    | english       |
    | français      |
    | Ελληνική      |
    | український   |
    | 芝诺           |
```

For demo purposes, the following functional test cases are going to be automated: **TC15**.