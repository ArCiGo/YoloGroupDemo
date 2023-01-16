# Test Cases

Some functional and non-functional test cases for Yolo Group assessment.

## Assumptions 🤔

* API testing should be performed.
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